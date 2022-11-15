import { Router } from "express";
import { Middlewares } from "@/middlewares";
import { messageControllers } from "@/controllers";

const { isAuthenticated, validateObjectID } = Middlewares;

const router = Router({ mergeParams: true });

router.route("/message/:user_id").post(isAuthenticated, validateObjectID("user_id"), messageControllers.messageToUser);

router.get("/messages", isAuthenticated, messageControllers.getMessages);

router.get("/messages/unread", isAuthenticated, messageControllers.getUnreadMessages);

router.patch(
  "/messages/read/:from_id",
  isAuthenticated,
  validateObjectID("from_id"),
  messageControllers.readMessageByID,
);

router.get(
  "/messages/:target_id",
  isAuthenticated,
  validateObjectID("target_id"),
  messageControllers.getMessagesOfTargeUser,
);

export default router;
