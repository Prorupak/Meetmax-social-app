import { Router } from "express";
import { commentControllers } from "@/controllers";
import { Middlewares } from "@/middlewares";
import { schemas, validateBody } from "@/validations/validations";

const { isAuthenticated, validateObjectID } = Middlewares;

const router = Router({ mergeParams: true });

router
  .route("/comment/:post_id")
  .post(
    isAuthenticated,
    validateObjectID("post_id"),
    validateBody(schemas.commentSchema),
    commentControllers.createComment,
  )
  .get(isAuthenticated, validateObjectID("post_id"), commentControllers.getComments);

router
  .route("/comment/:comment_id")
  .patch(
    isAuthenticated,
    validateObjectID("comment_id"),
    validateBody(schemas.commentSchema),
    commentControllers.updateComment,
  )
  .delete(isAuthenticated, validateObjectID("comment_id"), commentControllers.deleteComment);

router
  .route("/reply")
  .post(isAuthenticated, validateBody(schemas.commentSchema), commentControllers.replyComment)
  .get(isAuthenticated, commentControllers.getReplyComments);

router
  .route("/comment/like/:comment_id")
  .post(isAuthenticated, validateObjectID("comment_id"), commentControllers.likeComment);

export default router;
