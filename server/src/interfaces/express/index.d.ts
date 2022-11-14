import { IUser } from "@/models/users.models";

declare global {
  namespace Express {
    interface SessionData {
      cookie: any;
    }
  }
}

declare module "express" {
  export interface Request {
    user: IUser;
    file: any;
    files: any;
    query: any;
  }
}
