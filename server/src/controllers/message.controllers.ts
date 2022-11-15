import { MESSAGES_LIMIT } from "@/constants/constants";
import { makeResponseJson } from "@/utils/util";
import { ErrorMiddleware } from "@/middlewares";
import { Chat, Message, User } from "@/models";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

const { ErrorHandler } = ErrorMiddleware;

export const messageToUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.params;
    const { text } = req.body;
    const user = await User.findById(user_id);
    if (!user) return next(new ErrorHandler(400, "Receiver not found."));
    if (!text) return next(new ErrorHandler(400, "Text is required."));

    if (req.user._id.toString() === user_id) {
      return next(new ErrorHandler(400, "You can\t send message to yourself."));
    }

    const message = new Message({
      from: req.user._id,
      to: new Types.ObjectId(user_id),
      text,
      seen: false,
      createdAt: Date.now(),
    });

    await Chat.findOneAndUpdate(
      {
        participants: {
          $all: [{ $elemMatch: { $eq: req.user._id } }, { $elemMatch: { $eq: new Types.ObjectId(user_id) } }],
        },
      },
      {
        $set: {
          lastMessage: message._id,
          participants: [req.user._id, new Types.ObjectId(user_id)],
        },
      },
      { upsert: true },
    );

    await message.save();
    await message.populate({
      path: "from to",
      select: "username profilePicture fullName",
    });

    // Notify user
    const io = req.app.get("io");

    [user_id, req.user._id.toString()].forEach(user => {
      io.to(user).emit("newMessage", {
        ...message.toObject(),
        isOwnMessage: user === message.from._id.toString() ? true : false,
      });
    });

    res.status(200).send(makeResponseJson(message));
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const offset = parseInt(req.query.offset as string) || 0;

    const limit = MESSAGES_LIMIT;
    const skip = offset * limit;

    const agg = await Chat.aggregate([
      {
        $match: {
          participants: { $in: [req.user._id] },
        },
      },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "messages",
          localField: "lastMessage",
          foreignField: "_id",
          as: "message",
        },
      },
      {
        $unwind: "$message",
      },
      {
        $project: {
          _id: 0,
          message: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "message.from",
          foreignField: "_id",
          as: "message.from",
        },
      },
      { $unwind: "$message.from" },
      {
        $project: {
          to: "$message.to",
          text: "$message.text",
          id: "$message._id",
          seen: "$message.seen",
          createdAt: "$message.createdAt",
          from: {
            username: "$message.from.username",
            id: "$message.from._id",
            profilePicture: "$message.from.profilePicture",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "to",
          foreignField: "_id",
          as: "message.to",
        },
      },
      { $unwind: "$message.to" },
      {
        $project: {
          id: 1,
          from: 1,
          text: 1,
          seen: 1,
          createdAt: 1,
          to: {
            username: "$message.to.username",
            id: "$message.to._id",
            profilePicture: "$message.to.profilePicture",
          },
          isOwnMessage: {
            $cond: [{ $eq: ["$from.id", req.user._id] }, true, false],
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (agg.length === 0 || typeof agg[0] === "undefined") {
      return next(new ErrorHandler(404, "You have no messages."));
    }

    res.status(200).send(makeResponseJson(agg));
  } catch (error) {
    next(error);
  }
};

export const getUnreadMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agg = await Message.aggregate([
      {
        $match: {
          to: req.user._id,
        },
      },
      {
        $group: {
          _id: "$from",
          seenCount: {
            $push: {
              $cond: [{ $eq: ["$seen", false] }, "$_id", "$$REMOVE"],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          count: {
            $size: "$seenCount",
          },
        },
      },
    ]);

    const totalUnseen = agg.reduce((acc, obj) => acc + obj.count, 0);

    res.status(200).send(makeResponseJson({ count: totalUnseen }));
  } catch (error) {
    next(error);
  }
};

export const readMessageByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { from_id } = req.params;

    await Message.updateMany(
      {
        from: new Types.ObjectId(from_id),
        to: req.user._id,
        seen: false,
      },
      {
        $set: { seen: true },
      },
    );

    res.status(200).send(makeResponseJson({ state: true }));
  } catch (error) {
    next(error);
  }
};

export const getMessagesOfTargeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { target_id } = req.params;
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = MESSAGES_LIMIT;
    const skip = offset * limit;

    const messages = await Message.find({
      $or: [
        { from: req.user._id, to: new Types.ObjectId(target_id) },
        { from: new Types.ObjectId(target_id), to: req.user._id },
      ],
    })
      .populate("from", "username profilePicture")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const mapped = messages.map(msg => {
      return {
        ...msg.toObject(),
        isOwnMessage: msg.from.id === req.user._id.toString() ? true : false,
      };
    });

    if (messages.length === 0) {
      return next(new ErrorHandler(404, "No messages."));
    }

    res.status(200).send(makeResponseJson(mapped));
  } catch (error) {
    next(error);
  }
};
