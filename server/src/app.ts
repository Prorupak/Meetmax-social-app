import express from "express";
import { Server } from "http";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import cors from "cors";
import csurf from "csurf";
import colors from "colors";
import createError from "http-errors";
import compression from "compression";
import { ErrorMiddleware } from "@middlewares/index";
import { dbConnection } from "@databases";
import configs from "./config";
import api from "@/routes/api";
import session, { SessionOptions } from "express-session";
import passport, { authenticate } from "passport";
import initPassport from "@/config/passport";

const { errorMiddleware } = ErrorMiddleware;

colors.enable();

class Express {
  public app: express.Application;
  public server: Server;
  public env: string;
  public port: string | number;
  constructor() {
    this.app = express();

    this.server = new Server(this.app);
    this.env = configs.NODE_ENV || "development";
    this.port = configs.PORT || 9005;
    this.connectDb();
    this.initMiddlewares();
    initPassport(passport);
  }
  private initMiddlewares(): void {
    this.app.disable("x-powered-by");
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors(configs.cors));
    this.app.use(cookieParser());
    this.app.set("trust proxy", 1);
    this.app.use(compression());

    this.app.use(session(configs.session as SessionOptions));
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.use("/api", api);

    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      next(createError(404));
    });

    this.app.use(csurf());
    this.app.use(errorMiddleware);
  }

  public connectDb(): void {
    connect(dbConnection.url, dbConnection.options)
      .then(() => {
        console.log(`🚀 Connected to database`.green);
      })
      .catch(err => {
        console.log(`❌ Failed to connect to database`.red);
        console.log(err);
      });
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log(`=================================`.blue.bold);
      console.log(`=======`.yellow + ` ENV: ${this.env} `.random + `=======`.yellow);
      console.log(`🚀 App listening on the port`.green + ` ${this.port}`.red);
      console.log(`=================================`.blue);
    });
  }
}
export default Express;
