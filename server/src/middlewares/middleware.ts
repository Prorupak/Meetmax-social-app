import { NextFunction, Request, Response } from "express";
import Error from "./error.middleware";
import { isValidObjectId } from "mongoose";

const { ErrorHandler } = Error;

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new ErrorHandler(401, "Unauthorized"));
};

function validateObjectID(...ObjectIDs) {
  return function (req: any, res: any, next: NextFunction) {
    ObjectIDs.forEach(id => {
      if (!isValidObjectId(req.params[id])) {
        return next(new ErrorHandler(400, `ObjectID ${id} supplied is not valid`));
      } else {
        next();
      }
    });
  };
}

export default { isAuthenticated, validateObjectID };
