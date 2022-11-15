import passport from "passport";

import { ErrorMiddleware } from "@/middlewares";
import { IUser } from "@/models/users.models";
import { default as Token, default as TokenSchema } from "@/models/token.models";
import { makeResponseJson, sessionizeUser } from "@/utils/util";
import { NextFunction, Request, Response } from "express";
import { sendPasswordResetInstructionMail, sendVerificationMail } from "@/utils/sendGridConfig";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "@/models";

const { ErrorHandler } = ErrorMiddleware;

export const register = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local-register", (err, user, info) => {
    if (err) {
      console.log("ERR", err);
      return next(new ErrorHandler(409, err?.message));
    }

    if (user) {
      // if user has been successfully created
      req.logIn(user, function (err) {
        // <-- Log user in
        if (err) {
          console.log("ERR", err);
          return next(err);
        }

        const userData = sessionizeUser(user);
        return res.status(200).send(makeResponseJson(userData));
      });
    } else {
      next(new ErrorHandler(409, info.message));
    }
  })(req, res, next);
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  console.log("FIREED");
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new ErrorHandler(400, info.message));
    } else {
      req.logIn(user, function (err) {
        // <-- Log user in
        if (err) {
          return next(err);
        }

        const userData = sessionizeUser(user);
        return res.status(200).send(makeResponseJson({ auth: userData, user: (req.user as IUser).toUserJSON() }));
      });
    }
  })(req, res, next);
};

export const checkSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    const userData = sessionizeUser(req.user);
    res.status(200).send(makeResponseJson({ auth: userData, user: (req.user as IUser).toProfileJSON() }));
  } else {
    next(new ErrorHandler(401, "Session invalid/expired."));
  }
};

export const logOut = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.logOut(function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).send(makeResponseJson({ message: "Logged out successfully." }));
    });
  } catch (e) {
    console.log("error", e);
    next(new ErrorHandler(422, "Unable to logout. Please try again."));
  }
};

export const accountVerify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ username: req.user.username });

    if (user.email) {
      await sendVerificationMail({
        email: req.user.email,
        name: req.user.firstName,
        verificationKey: user.generateVerificationKey(),
      });

      console.log("sent mail to".red, req.user.email);
    }
    res.send(makeResponseJson({ success: true }));
  } catch (error: any) {
    next(error);
  }
};

export const accountVerifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;
    // Check we have an id
    if (!token) {
      next(new ErrorHandler(422, "Missing token."));
    }

    jwt.verify(token, process.env.USER_VERIFICATION_TOKEN_SECRET, async (err, payload: { user_id: string }) => {
      if (err) {
        console.log("Failed to verify email", err);
        return res.redirect(`${process.env.CLIENT_URL}/account-verification-failed`);
        // return next(new ErrorHandler(400, 'Invalid Token.'));
      }

      const user = await User.findOne({ _id: payload.user_id });

      if (!user) {
        return next(new ErrorHandler(404, "User does not exist."));
      }

      console.log(user);

      //  Update user verification status to true
      user.isEmailVerified = true;
      await user.save();

      // TODO
      // Redirect once validated
      res.redirect(`${process.env.CLIENT_URL}`);

      // return res.status(200).send({
      //     verified: true
      // });
    });
  } catch (error: any) {
    next(error);
  }
};

export const recoverAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body;
    const obj: Record<string, string> = {};

    if (username.includes("@")) {
      obj.email = username;
    } else {
      obj.username = username;
    }

    const user = await User.findOne(obj);

    if (user) {
      await Token.deleteMany({ _user_id: user._id });

      const resetToken = crypto.randomBytes(32).toString("hex");
      const passwordToken = TokenSchema.generateVerificationToken(resetToken);

      await new Token({
        _user_id: user._id,
        token: passwordToken,
        createdAt: Date.now(),
      }).save();

      await sendPasswordResetInstructionMail({
        email: user.email,
        token: resetToken,
        user_id: user._id,
        name: user.firstName,
      });
    }

    res.send(makeResponseJson({ success: true }));
  } catch (error: any) {
    next(error);
  }
};

export const passwordReset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, token, password } = req.body;

    // console.log(req.body)

    const passwordResetToken = await Token.findOne({ _user_id: user_id });

    if (!passwordResetToken || !token || !user_id) {
      console.log("NOT TOKEN PROVIDED");
      throw new Error("Invalid or expired password reset token");
    }

    jwt.verify(
      passwordResetToken.token,
      process.env.USER_VERIFICATION_TOKEN_SECRET,
      async (err, decoded: { hash: string }) => {
        if (err) {
          console.log(err);
          return next(new ErrorHandler(400, "Invalid or expired reset token."));
        }

        if (decoded.hash !== token) {
          console.log("HASH NOT MATCH");
          return next(new ErrorHandler(400, "Invalid or expired reset token."));
        }

        await User.findOneAndUpdate(
          { _id: user_id },
          {
            $set: {
              password: User.hashPassword(password),
            },
          },
          { new: true },
        );

        await passwordResetToken.deleteOne();

        //Todo
        // Send email to user indicating password reset activity

        res.send({ success: true });
      },
    );
  } catch (error: any) {
    next(error);
  }
};
