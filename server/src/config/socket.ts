import { Application } from "express";
import { Server } from "http";
import config from "@config";
import { Socket } from "socket.io/dist/socket";
import { ErrorMiddleware } from "@middlewares/index";

const { ErrorHandler } = ErrorMiddleware;

import User from "@/models/users.models";

const socket = (app: Application, server: Server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: config.cors.origin,
      methods: ["GET", "POST"],
    },
  });

  app.set("io", io);

  io.on("connection", (socket: Socket) => {
    console.log(`⚡️: Connected to ${socket.id}`);

    socket.on("userConnect", (id: string) => {
      User.findById(id)
        .then(user => {
          if (user) {
            socket.join(user._id.toString());
            console.log(`⚡️: ${user.username} Joined to server`);
          }
        })
        .catch((e: any) => {
          console.log("Invalid user ID, cannot join Socket.", e.message);
          return new ErrorHandler(400, e.message);
        });
    });

    socket.on("userDisconnect", userID => {
      console.log(`🔥: Client disconnected`);
      socket.leave(userID);
    });

    socket.on("connect_error", err => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("disconnect", (reason: any) => {
      console.log(`📖: ${reason}`);
    });
  });
};

export default socket;
