import { Router } from "express";
import { notificationControllers } from "@/controllers";
import { Middlewares } from "@/middlewares";

const { getNotifications, getUnreadNotifications, markNotificationsAsRead, readNotification } = notificationControllers;
const { isAuthenticated, validateObjectID } = Middlewares;

const router = Router({ mergeParams: true });

router.get("/notifications", isAuthenticated, getNotifications);

router.get("/notifications/unread", isAuthenticated, getUnreadNotifications);

router.patch("/notifications/mark-all-read", isAuthenticated, markNotificationsAsRead);

router.patch("/notifications/:id/read", isAuthenticated, validateObjectID("id"), readNotification);

export default router;
