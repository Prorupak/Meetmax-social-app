import { Router } from "express";
import { login, register, checkSession, logOut } from "@/controllers/auth.controllers";
import { Middlewares } from "@/middlewares";
import { schemas, validateBody } from "@/validations/validations";
import passport from "passport";
import configs from "@/config";

const { isAuthenticated } = Middlewares;

const router = Router({ mergeParams: true });

router.route("/register").post(register, validateBody(schemas.registerSchema));

router.post("/login", login, validateBody(schemas.loginSchema));

router.get("/check-session", checkSession);

//@route DELETE /api/v1/logout
router.delete("/logout", isAuthenticated, logOut);

//@route GET /api/v1/auth/github GITHUB AUTH
router.get("/google", passport.authenticate("google-auth", { scope: ["email", "profile"] }));

//@route GET /api/v1/auth/github/callback GITHUB AUTH
router.get(
  "/google/callback",
  passport.authenticate("google-auth", {
    failureRedirect: `${configs.client}/auth/google/failed`,
    successRedirect: `${configs.client}`,
  }),
);

export default router;
