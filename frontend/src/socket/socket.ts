import { io } from "socket.io-client";

const socket = io("http://localhost:9005", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 50,
});

export default socket;
