import { Router } from "express";
import { login, register, checkSession, logOut } from "@/controllers/auth.controllers";
import { Middlewares } from "@/middlewares";

const { isAuthenticated } = Middlewares;

const router = Router({ mergeParams: true });

router.route("/register").post(register);

router.post("/login", login);

router.get("/check-session", checkSession);

//@route DELETE /api/v1/logout
router.delete("/logout", isAuthenticated, logOut);

export default router;
