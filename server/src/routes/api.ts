import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import followRoutes from "./follow.routes";
import postRoutes from "./post.routes";
import newsFeedRoutes from "./newsfeed.routes";
import notificationRoutes from "./notification.routes";
import commentRoutes from "./comment.routes";
import bookmarkRoutes from "./bookmark.routes";

const app = express();

app.use("/v1/auth", authRoutes);
app.use("/v1", userRoutes);
app.use("/v1", followRoutes);
app.use("/v1", postRoutes);
app.use("/v1", newsFeedRoutes);
app.use("/v1", notificationRoutes);
app.use("/v1", commentRoutes);
app.use("/v1", bookmarkRoutes);

export default app;
