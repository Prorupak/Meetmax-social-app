import { NOTIFICATIONS_LIMIT } from "@/constants/constants";
import { ErrorMiddleware } from "@/middlewares";
import { Notification } from "@/models";
import { makeResponseJson } from "@/utils/util";
import { NextFunction, Request, Response } from "express";

const { ErrorHandler } = ErrorMiddleware;

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const offset = parseInt(req.query.offset as string) || 0;

    const limit = NOTIFICATIONS_LIMIT;
    const skip = offset * limit;

    const notifications = await Notification.find({ target: req.user._id })
      .populate("target initiator", "profilePicture username fullName")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    const unreadCount = await Notification.find({ target: req.user._id, unread: true });
    const count = await Notification.find({ target: req.user._id });
    const result = { notifications, unreadCount: unreadCount.length, count: count.length };

    if (notifications.length === 0 && offset === 0) {
      return next(new ErrorHandler(404, "You have no notifications."));
    } else if (notifications.length === 0 && offset >= 1) {
      return next(new ErrorHandler(404, "No more notifications."));
    }

    res.status(200).send(makeResponseJson(result));
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getUnreadNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notif = await Notification.find({ target: req.user._id, unread: true });

    res.status(200).send(makeResponseJson({ count: notif.length }));
  } catch (e) {
    console.log("CANT GET UNREAD NOTIFICATIONS", e);
    next(e);
  }
};

export const markNotificationsAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Notification.updateMany(
      { target: req.user._id },
      {
        $set: {
          unread: false,
        },
      },
    );
    res.status(200).send(makeResponseJson({ state: false }));
  } catch (e) {
    console.log("CANT MARK ALL AS UNREAD", e);
    next(e);
  }
};

export const readNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const notif = await Notification.findById(id);
    if (!notif) return res.sendStatus(400);

    await Notification.findByIdAndUpdate(id, {
      $set: {
        unread: false,
      },
    });

    res.status(200).send(makeResponseJson({ state: false })); // state = false EQ unread = false
  } catch (e) {
    next(e);
  }
};
