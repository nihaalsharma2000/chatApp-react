// server/index.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined room: ${room}`);

    socket.to(room).emit("receiveMessage", {
      username: "System",
      text: `${username} has joined the room`
    });
  });

  socket.on("sendMessage", ({ username, room, text }) => {
    io.to(room).emit("receiveMessage", { username, text });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3500, () => {
  console.log("Server running on http://localhost:3500");
});
