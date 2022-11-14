import { Router } from "express";
import { postControllers } from "@/controllers";
import { Middlewares } from "@/middlewares";
import { schemas, validateBody } from "@validations/validations";
import { multer } from "@/storage/cloudinary";

const { isAuthenticated, validateObjectID } = Middlewares;

const router = Router({ mergeParams: true });

router
  .route("/post")
  .post(isAuthenticated, multer.array("photos", 5), validateBody(schemas.createPostSchema), postControllers.createPost);

router.route("/:username/post").get(isAuthenticated, postControllers.getPostByUsername);

router
  .route("/post/:post_id")
  .get(isAuthenticated, validateObjectID("post_id"), postControllers.getPostByPostID)
  .put(isAuthenticated, validateObjectID("post_id"), validateBody(schemas.createPostSchema), postControllers.updatePost)
  .delete(isAuthenticated, validateObjectID("post_id"), postControllers.deletePost);

router
  .route("/post/:post_id/like")
  .post(isAuthenticated, validateObjectID("post_id"), postControllers.likePost)
  .get(isAuthenticated, validateObjectID("post_id"), postControllers.getLikes);

export default router;
