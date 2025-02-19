import { Middlewares } from "@middlewares/index";
import { Router } from "express";

import { userController } from "@controllers/index";
import { multer } from "@/storage/cloudinary";
// import { multer } from "@/storage/cloudinary";

const router = Router({ mergeParams: true });

const { editUser, getUserByUsername, uploadPhoto } = userController;
const { isAuthenticated } = Middlewares;

router.route("/user/:username").get(getUserByUsername);

router.route("/user/:username/edit").patch(isAuthenticated, editUser);

router.route("/user/upload/:field").post(isAuthenticated, multer.single("photo"), uploadPhoto);

export default router;
