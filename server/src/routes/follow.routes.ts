import { Router } from "express";
import { Middlewares } from "@middlewares/index";
import { followControllers } from "@controllers/index";

const { isAuthenticated, validateObjectID } = Middlewares;
const { followUsers, unFollowUsers, getFollowingByUsername, getFollowersByUsername, suggestedUsers } =
  followControllers;

const router = Router({ mergeParams: true });

router.post("/follow/:follow_id", isAuthenticated, validateObjectID("follow_id"), followUsers);

router.post("/unfollow/:follow_id", isAuthenticated, validateObjectID("follow_id"), unFollowUsers);

router.get("/following/:username", isAuthenticated, getFollowingByUsername);

router.get("/followers/:username", isAuthenticated, getFollowersByUsername);

router.get("/users/suggested", isAuthenticated, suggestedUsers);

export default router;
