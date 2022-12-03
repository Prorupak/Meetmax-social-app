import { Router } from "express";
import { Middlewares } from "@/middlewares";
import { schemas, validateBody } from "@/validations/validations";
import passport from "passport";
import configs from "@/config";
import {
  login,
  register,
  checkSession,
  logOut,
  accountVerify,
  accountVerifyToken,
  passwordReset,
  recoverAccount,
  emailLogin,
} from "@/controllers/auth.controllers";

const { isAuthenticated } = Middlewares;

const router = Router({ mergeParams: true });

router.route("/register").post(register, validateBody(schemas.registerSchema));

router.post("/login", validateBody(schemas.loginSchema), login);

router.post("/sign-in", emailLogin);

router.get("/check-session", checkSession);

router.delete("/logout", isAuthenticated, logOut);

router.post("/account/verify", isAuthenticated, accountVerify);

router.get("/account/verify/:token", accountVerifyToken);

router.post("/account/recover", recoverAccount);

router.patch("/account/password/reset", passwordReset);

router.get("/google", passport.authenticate("google-auth", { scope: ["email", "profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google-auth", {
    failureRedirect: `${configs.client}/auth/google/failed`,
    successRedirect: `${configs.client}`,
  }),
);

export default router;
