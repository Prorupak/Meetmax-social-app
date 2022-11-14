import { Router } from "express";
import { newsFeedControllers } from "@/controllers";

const router = Router({ mergeParams: true });

router.get("/feed", newsFeedControllers.feed);

export default router;
