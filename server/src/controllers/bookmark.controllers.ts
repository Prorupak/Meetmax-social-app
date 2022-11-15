import { BOOKMARKS_LIMIT } from "@/constants/constants";
import { makeResponseJson } from "@/utils/util";
import { ErrorMiddleware } from "@/middlewares/index";
import { Bookmark, Post } from "@/models";
import { NextFunction, Request, Response, Router } from "express";
import { Types } from "mongoose";

const { ErrorHandler } = ErrorMiddleware;

export const createBookmarkByPostID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { post_id } = req.params;
    const userID = req.user._id;

    const post = await Post.findById(post_id);
    if (!post) return new ErrorHandler(404, "Post not found");

    if (userID.toString() === post._author_id.toString()) {
      return next(new ErrorHandler(400, "You can't bookmark your own post."));
    }

    const isPostBookmarked = await Bookmark.findOne({
      _author_id: userID,
      _post_id: new Types.ObjectId(post_id),
    });

    if (isPostBookmarked) {
      await Bookmark.findOneAndDelete({ _author_id: userID, _post_id: new Types.ObjectId(post_id) });

      res.status(200).send(makeResponseJson({ state: false }));
    } else {
      const bookmark = new Bookmark({
        _post_id: post_id,
        _author_id: userID,
        createdAt: Date.now(),
      });
      await bookmark.save();

      res.status(200).send(makeResponseJson({ state: true }));
    }
  } catch (e) {
    console.log("CANT BOOKMARK POST ", e);
    next(e);
  }
};

export const getBookmarks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = req.user._id;
    const offset = parseInt(req.query.offset as string, 10) || 0;
    const limit = BOOKMARKS_LIMIT;
    const skip = offset * limit;

    const bookmarks = await Bookmark.find({ _author_id: userID })
      .populate({
        path: "post",
        select: "photos description",
        populate: {
          path: "likesCount commentsCount",
        },
      })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    if (bookmarks.length === 0) {
      return next(new ErrorHandler(404, "You don't have any bookmarks."));
    }

    const result = bookmarks.map(item => {
      return {
        ...item.toObject(),
        isBookmarked: true,
      };
    });

    res.status(200).send(makeResponseJson(result));
  } catch (e) {
    console.log("CANT BOOKMARK POST ", e);
    next(e);
  }
};
