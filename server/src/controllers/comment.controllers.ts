import { NextFunction, Request, Response } from "express";

import { COMMENTS_LIMIT } from "@/constants/constants";
import { filterWords, makeResponseJson } from "@/utils/util";
import { ErrorMiddleware } from "@/middlewares";
import { Comment, Like, Notification, Post } from "@/models";
import { ENotificationType } from "@/models/notifications.models";
import { Types } from "mongoose";

const { ErrorHandler } = ErrorMiddleware;

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { post_id } = req.params;
    const { body } = req.body;
    const userID = req.user._id;

    // check if the POST actually exists
    const post = await Post.findById(post_id);
    if (!post) return next(new ErrorHandler(404, "Unable to comment. Post not found."));

    const comment = new Comment({
      _post_id: post_id,
      _author_id: userID,
      body: filterWords.clean(body),
      parents: [],
      createdAt: Date.now(),
    });

    await comment.save();
    await comment.populate({
      path: "author",
      select: "username profilePicture fullName",
    });

    // SEND NOTIFICATION
    if (post._author_id.toString() !== userID.toString()) {
      const io = req.app.get("io");
      const notification = new Notification({
        type: "comment",
        initiator: userID,
        target: new Types.ObjectId(post._author_id),
        link: `/post/${post_id}`,
        createdAt: Date.now(),
      });

      notification.save().then(async doc => {
        await doc.populate({
          path: "target initiator",
          select: "fullName profilePicture username",
        });

        io.to(post._author_id.toString()).emit("newNotification", { notification: doc, count: 1 });
      });
    }

    // append the isPostOwner and isOwnComment property
    const result = {
      ...comment.toObject(),
      isOwnComment: true,
      isPostOwner: post._author_id.toString() === req.user._id.toString(),
    };

    res.status(200).send(makeResponseJson(result));
  } catch (e) {
    console.log('CAN"T COMMENT', e);
    next(e);
  }
};

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { post_id } = req.params;
    const skipParams = parseInt(req.query.skip as string);
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || COMMENTS_LIMIT;
    const skip = skipParams || offset * limit;

    const post = await Post.findById(new Types.ObjectId(post_id));
    if (!post) return next(new ErrorHandler(404, "No post found."));

    const agg = await Comment.aggregate([
      {
        $match: {
          _post_id: new Types.ObjectId(post_id),
          depth: 1,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "_author_id",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          author: {
            username: "$author.username",
            email: "$author.email",
            profilePicture: "$author.profilePicture",
            id: "$author._id",
          },
          depth: "$depth",
          parent: "$parent",
          body: "$body",
          isEdited: "$isEdit",
          post_id: "$_post_id",
          createdAt: "$createdAt",
          updatedAt: "$updatedAt",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$parent", "$$id"] }, { $eq: ["$depth", 2] }],
                },
              },
            },
          ],
          as: "replyCount",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "target",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesUserIDs: {
            $map: {
              input: "$likes",
              as: "commentLike",
              in: "$$commentLike.user",
            },
          },
        },
      },
      {
        $addFields: {
          isOwnComment: {
            $eq: ["$author.id", req.user._id],
          },
          isLiked: {
            $in: [req.user?._id, "$likesUserIDs"],
          },
          isPostOwner: post._author_id.toString() === req.user._id.toString(),
        }, //user.id === comment.author.id || authorID === user.id)
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          depth: 1,
          parent: 1,
          author: 1,
          isEdited: 1,
          post_id: 1,
          createdAt: 1,
          updatedAt: 1,
          body: 1,
          isOwnComment: 1,
          isPostOwner: 1,
          isLiked: 1,
          replyCount: { $size: "$replyCount" },
          likesCount: { $size: "$likes" },
        },
      },
    ]);

    if (agg.length === 0 && offset < 1) {
      return next(new ErrorHandler(404, "No comments found."));
    }

    if (agg.length === 0 && offset >= 1) {
      return next(new ErrorHandler(404, "No more comments."));
    }

    res.status(200).send(makeResponseJson(agg));
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { comment_id } = req.params;
    const userID = req.user._id.toString();
    const comment = await Comment.findById(comment_id);
    if (!comment) return next(new ErrorHandler(400, "Comment not found."));

    // FIND THE POST TO GET AUTHOR ID
    const post = await Post.findById(comment._post_id);
    const postAuthorID = post._author_id.toString();
    const commentAuthorID = comment._author_id.toString();

    // IF POST OWNER OR COMMENTOR - DELETE COMMENT
    if (userID === commentAuthorID || userID === postAuthorID) {
      // TODO ----------- DELETE ALL COMMENTS/REPLIES/THREAD & NOTIFICATIONS
      await Comment.deleteMany({
        $or: [{ _id: comment_id }, { parents: { $in: [comment_id] } }],
      });

      await Notification.findOneAndDelete({
        type: "comment",
        target: new Types.ObjectId(commentAuthorID),
        initiator: new Types.ObjectId(userID),
        link: `/post/${post._id}`,
      });

      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { comment_id } = req.params;
    const { body } = req.body;
    const userID = req.user._id;
    if (!body) return res.sendStatus(400);

    const comment = await Comment.findById(comment_id);
    if (!comment) return next(new ErrorHandler(400, "Comment not found."));

    const post = await Post.findById(comment._post_id);
    if (!post) return next(new ErrorHandler(400, "Post not found."));

    if (userID.toString() === comment._author_id.toString()) {
      const updatedComment = await Comment.findByIdAndUpdate(
        new Types.ObjectId(comment_id),
        {
          $set: {
            body: filterWords.clean(body),
            updatedAt: Date.now(),
            isEdited: true,
          },
        },
        {
          new: true,
        },
      );

      await updatedComment.populate({
        path: "author",
        select: "fullName username profilePicture",
      });

      // append the isPostOwner and isOwnComment property
      const result = {
        ...updatedComment.toObject(),
        isOwnComment: true,
        isPostOwner: post._author_id.toString() === req.user._id.toString(),
      };

      res.status(200).send(makeResponseJson(result));
    } else {
      return next(new ErrorHandler(401));
    }
  } catch (e) {
    next(e);
  }
};

export const replyComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, comment_id, post_id } = req.body;
    const userID = req.user._id;

    // check if the Comment actually exists
    const comment = await Comment.findById(new Types.ObjectId(comment_id));
    if (!comment) return next(new ErrorHandler(404, "Unable to reply. Comment not found."));
    // check if the Post actually exists
    const post = await Post.findById(comment._post_id);
    if (!post) return next(new ErrorHandler(404, "Unable to reply. Post not found."));

    const reply = new Comment({
      _post_id: comment._post_id,
      _author_id: userID,
      parent: comment._id,
      parents: [...comment.parents, comment],
      depth: comment.depth + 1,
      body: filterWords.clean(body),
      createdAt: Date.now(),
    });

    await reply.save();
    await reply.populate({
      path: "author",
      select: "username profilePicture fullName",
    });

    // SEND NOTIFICATION
    if (req.user._id.toString() !== comment._author_id.toString()) {
      const io = req.app.get("io");
      const notification = new Notification({
        type: "reply",
        initiator: userID,
        target: new Types.ObjectId(comment._author_id),
        link: `/post/${post_id}`,
        createdAt: Date.now(),
      });

      notification.save().then(async doc => {
        await doc.populate({
          path: "target initiator",
          select: "fullName profilePicture username",
        });

        io.to(comment._author_id.toString()).emit("newNotification", { notification: doc, count: 1 });
      });
    }

    // append the isPostOwner and isOwnComment property
    const result = {
      ...reply.toObject(),
      isOwnComment: true,
      isPostOwner: post._author_id.toString() === req.user._id.toString(),
    };

    res.status(200).send(makeResponseJson(result));
  } catch (e) {
    console.log('CAN"T COMMENT', e);
    next(e);
  }
};

export const getReplyComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { comment_id, post_id } = req.query;
    const skipParams = parseInt(req.query.skip as string);
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || COMMENTS_LIMIT;
    const skip = skipParams || offset * limit;

    const reply = await Comment.findById(new Types.ObjectId(comment_id));
    if (!reply) return next(new ErrorHandler(404, "No reply found."));
    const post = await Post.findById(new Types.ObjectId(post_id));
    if (!post) return next(new ErrorHandler(404, "No post found."));

    const agg = await Comment.aggregate([
      {
        $match: {
          parent: new Types.ObjectId(comment_id),
          depth: reply.depth + 1,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "_author_id",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          author: {
            username: "$author.username",
            email: "$author.email",
            profilePicture: "$author.profilePicture",
            id: "$author._id",
          },
          depth: "$depth",
          parent: "$parent",
          body: "$body",
          isEdited: "$isEdit",
          post_id: "$_post_id",
          createdAt: "$createdAt",
          updatedAt: "$updatedAt",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$parent", "$$id"] }, { $eq: ["$depth", reply.depth + 2] }],
                },
              },
            },
          ],
          as: "replyCount",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "target",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesUserIDs: {
            $map: {
              input: "$likes",
              as: "commentLike",
              in: "$$commentLike.user",
            },
          },
        },
      },
      {
        $addFields: {
          isOwnComment: {
            $eq: ["$author.id", req.user._id],
          },
          isLiked: {
            $in: [req.user?._id, "$likesUserIDs"],
          },
          isPostOwner: post._author_id.toString() === req.user._id.toString(),
        }, //user.id === comment.author.id || authorID === user.id)
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          depth: 1,
          parent: 1,
          author: 1,
          isEdited: 1,
          post_id: 1,
          createdAt: 1,
          updatedAt: 1,
          body: 1,
          isOwnComment: 1,
          isPostOwner: 1,
          isLiked: 1,
          replyCount: { $size: "$replyCount" },
          likesCount: { $size: "$likes" },
        },
      },
    ]);

    if (agg.length === 0 && offset < 1) {
      return next(new ErrorHandler(404, "No comments found."));
    }

    if (agg.length === 0 && offset >= 1) {
      return next(new ErrorHandler(404, "No more comments."));
    }

    res.status(200).send(makeResponseJson(agg));
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const likeComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { comment_id } = req.params;

    const comment = await Comment.findById(comment_id);

    if (!comment) return next(new ErrorHandler(400, "Comment not found."));

    let state = false; // the state whether isLiked = true | false to be sent back to user
    const query = {
      target: new Types.ObjectId(comment_id),
      user: req.user._id,
      type: "Comment",
    };

    const likedComment = await Like.findOne(query); // Check if already liked post

    if (!likedComment) {
      // If not liked, save new like and notify post owner
      const like = new Like({
        type: "Comment",
        target: comment._id,
        user: req.user._id,
      });

      await like.save();
      state = true;

      // If not the post owner, send notification to post owner
      if (comment._author_id.toString() !== req.user._id.toString()) {
        const io = req.app.get("io");
        const targetUserID = new Types.ObjectId(comment._author_id);
        const newNotif = {
          type: ENotificationType.commentLike,
          initiator: req.user._id,
          target: targetUserID,
          link: `/post/${comment._post_id}`,
        };

        const notificationExists = await Notification.findOne(newNotif);

        if (!notificationExists) {
          const notification = new Notification({ ...newNotif, createdAt: Date.now() });

          notification.save().then(async doc => {
            await doc.populate({
              path: "target initiator",
              select: "fullName profilePicture username",
            });

            console.log("EMITTING LIKE NOTIFICATION TO", targetUserID.toString());

            io.to(comment._author_id.toString()).emit("newNotification", { notification: doc, count: 1 });
          });
        } else {
          await Notification.findOneAndUpdate(newNotif, { $set: { createdAt: Date.now() } });
        }
      }
    } else {
      await Like.findOneAndDelete(query);
      state = false;
    }

    const likesCount = await Like.find({ target: new Types.ObjectId(comment_id) });

    res.status(200).send(makeResponseJson({ state, likesCount: likesCount.length }));
  } catch (e) {
    console.log(e);
    next(e);
  }
};
