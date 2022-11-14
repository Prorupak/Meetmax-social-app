import { USERS_LIMIT } from "@/constants/constants";
import { ErrorMiddleware } from "@/middlewares";
import { Follow, NewsFeed, Notification, Post, User } from "@/models";
import { FollowServices } from "@/services";
import { makeResponseJson } from "@/utils/util";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

const { ErrorHandler } = ErrorMiddleware;

export const followUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { follow_id } = req.params;

    const user = User.findById(follow_id);
    // CHECK IF FOLLOWING USER EXIST
    if (!user) return next(new ErrorHandler(400, "The person you're trying to follow doesn't exist."));
    // CHECK IF FOLLOWING IS NOT YOURSELF
    if (follow_id === req.user._id.toString()) return next(new ErrorHandler(400, "You can't follow yourself."));

    //  CHECK IF ALREADY FOLLOWING
    const isFollowing = await Follow.findOne({
      user: req.user._id,
      target: new Types.ObjectId(follow_id),
    });

    if (isFollowing) {
      return next(new ErrorHandler(400, "Already following."));
    } else {
      const newFollower = new Follow({
        user: req.user._id,
        target: new Types.ObjectId(follow_id),
      });

      await newFollower.save();
    }

    // TODO ---- FILTER OUT DUPLICATES
    const io = req.app.get("io");
    const notification = new Notification({
      type: "follow",
      initiator: req.user._id,
      target: new Types.ObjectId(follow_id),
      link: `/user/${req.user.username}`,
      createdAt: Date.now(),
    });

    notification.save().then(async doc => {
      await doc.populate({
        path: "target initiator",
        select: "fullName profilePicture username",
      });

      io.to(follow_id).emit("newNotification", { notification: doc, count: 1 });
    });

    // SUBSCRIBE TO USER'S FEED
    const subscribeToUserFeed = await Post.find({ _author_id: new Types.ObjectId(follow_id) })
      .sort({ createdAt: -1 })
      .limit(10);

    if (subscribeToUserFeed.length !== 0) {
      const feeds = subscribeToUserFeed.map(post => {
        return {
          follower: req.user._id,
          post: post._id,
          post_owner: post._author_id,
          createdAt: post.createdAt,
        };
      });

      await NewsFeed.insertMany(feeds);
    }
    res.status(200).send(makeResponseJson({ state: true }));
  } catch (e) {
    console.log("CANT FOLLOW USER, ", e);
    next(e);
  }
};

export const unFollowUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { follow_id } = req.params;

    const user = User.findById(follow_id);
    if (!user) return next(new ErrorHandler(400, "The person you're trying to unfollow doesn't exist."));
    if (follow_id === req.user._id.toString()) return next(new ErrorHandler(400));

    await Follow.deleteOne({
      target: new Types.ObjectId(follow_id),
      user: req.user._id,
    });

    // UNSUBSCRIBE TO PERSON'S FEED
    await NewsFeed.deleteMany({
      post_owner: new Types.ObjectId(follow_id),
      follower: req.user._id,
    });

    res.status(200).send(makeResponseJson({ state: false }));
  } catch (e) {
    console.log("CANT FOLLOW USER, ", e);
    next(e);
  }
};

export const getFollowingByUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params;
    const offset = parseInt(req.query.offset) || 0;
    const limit = USERS_LIMIT;
    const skip = offset * limit;

    const user = await User.findOne({ username });
    if (!user) return next(new ErrorHandler(404, "User not found."));

    const following = await FollowServices.getFollow({ user: user._id }, "following", req.user, skip, limit);

    if (following.length === 0) {
      return next(new ErrorHandler(404, `${username} isn't following anyone.`));
    }

    res.status(200).send(makeResponseJson(following));
  } catch (e) {
    next(e);
  }
};

export const getFollowersByUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params;
    const offset = parseInt(req.query.offset) || 0;
    const limit = USERS_LIMIT;
    const skip = offset * limit;

    const user = await User.findOne({ username });
    if (!user) return next(new ErrorHandler(404, "User not found."));

    const followers = await FollowServices.getFollow({ target: user._id }, "followers", req.user, skip, limit);

    if (followers.length === 0) {
      return next(new ErrorHandler(404, `${username} has no followers.`));
    }

    res.status(200).send(makeResponseJson(followers));
  } catch (e) {
    console.log("CANT GET FOLLOWERS", e);
    next(e);
  }
};

export const suggestedUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const offset = parseInt(req.query.offset as string) || 0;
    const skipParam = parseInt(req.query.skip as string) || 0;

    const limit = parseInt(req.query.limit as string) || USERS_LIMIT;
    const skip = skipParam || offset * limit;

    const myFollowingDoc = await Follow.find({ user: req.user._id });
    const myFollowing = myFollowingDoc.map(user => user.target);

    const people = await User.aggregate([
      {
        $match: {
          _id: {
            $nin: [...myFollowing, req.user._id],
          },
        },
      },
      ...(limit < 10 ? [{ $sample: { size: limit } }] : []),
      { $skip: skip },
      { $limit: limit },
      {
        $addFields: {
          isFollowing: false,
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          username: "$username",
          profilePicture: "$profilePicture",
          isFollowing: 1,
        },
      },
    ]);

    if (people.length === 0) return next(new ErrorHandler(404, "No suggested people."));

    res.status(200).send(makeResponseJson(people));
  } catch (e) {
    console.log("CANT GET SUGGESTED PEOPLE", e);
    next(e);
  }
};

export default {
  followUsers,
  unFollowUsers,
  getFollowingByUsername,
  getFollowersByUsername,
  suggestedUsers,
};
