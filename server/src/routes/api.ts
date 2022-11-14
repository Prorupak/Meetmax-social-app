import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import followRoutes from "./follow.routes";
import postRoutes from "./post.routes";

const app = express();

app.use("/v1/auth", authRoutes);
app.use("/v1", userRoutes);
app.use("/v1", followRoutes);
app.use("/v1", postRoutes);

export default app;
