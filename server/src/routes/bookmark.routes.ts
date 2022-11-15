import { Router } from "express";
import { Middlewares } from "@/middlewares";
import { bookmarksControllers } from "@/controllers/index";

const { isAuthenticated, validateObjectID } = Middlewares;

const router = Router({ mergeParams: true });

router
  .route("/bookmark/post/:post_id")
  .post(isAuthenticated, validateObjectID("post_id"), bookmarksControllers.createBookmarkByPostID);

router.get("/bookmarks", isAuthenticated, bookmarksControllers.getBookmarks);

export default router;
