import MongoStore from "connect-mongo";
import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const env = process.env.NODE_ENV || "development";

console.log(`⚡️: Running in ${env} mode`);

const configs = {
  PORT: process.env.PORT,
  client: process.env.CLIENT_URL,
  mongo: process.env.MONGODB_URL1,
  NODE_ENV: process.env.NODE_ENV,
  LOG_FORMAT: process.env.LOG_FORMAT,
  LOG_DIR: process.env.LOG_DIR,
  mongoose: {
    url: process.env.MongoDB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  cors: {
    origin: ["http://localhost:3000", "http://localhost:4173/"],
    credentials: true,
    preflightContinue: true,
  },
  session: {
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 60 * 60 * 1000,
      secure: env !== "development",
      sameSite: env === "development" ? "strict" : "none",
      httpOnly: env !== "development",
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      dbName: "session-test",
      ttl: 1 * 60 * 60 * 1000,
      autoRemove: "interval",
      autoRemoveInterval: 60,
      crypto: {
        secret: "secret",
      },
    }),
  },
  cloudinary: {
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};

export default configs;
