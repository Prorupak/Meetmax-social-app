import { FEED_LIMIT } from "@/constants/constants";
import { makeResponseJson } from "@/utils/util";
import { ErrorMiddleware } from "@/middlewares";
import { EPrivacy } from "@/models/post.models";
import { NewsFeedServices, PostServices } from "@/services";
import { NextFunction, Request, Response } from "express";

const { ErrorHandler } = ErrorMiddleware;

export const feed = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const offset = parseInt(req.query.offset as string, 10) || 0;
    const limit = FEED_LIMIT;
    const skip = offset * limit;

    let result = [];

    if (req.isAuthenticated()) {
      result = await NewsFeedServices.getNewsFeed(req.user, { follower: req.user._id }, skip, limit);
    } else {
      result = await PostServices.getPosts(
        null,
        { privacy: EPrivacy.public },
        { skip, limit, sort: { createdAt: -1 } },
      );
    }

    if (result.length === 0) {
      return next(new ErrorHandler(404, "No more feed."));
    }

    res.status(200).send(makeResponseJson(result));
  } catch (e) {
    console.log("CANT GET FEED", e);
    next(e);
  }
};
