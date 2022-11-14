import passport from "passport";

import { ErrorMiddleware } from "@/middlewares";
import { IUser } from "@/models/users.models";
import { makeResponseJson, sessionizeUser } from "@/utils/util";
import { NextFunction, Request, Response } from "express";

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
