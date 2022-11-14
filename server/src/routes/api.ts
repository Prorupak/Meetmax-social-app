import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const app = express();

app.use("/v1/auth", authRoutes);
app.use("/v1", userRoutes);

export default app;
