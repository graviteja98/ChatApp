const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PrintDate = (id, s) => {
  const currentDate = new Date();

  // Get individual components of the date and time
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format the output
  const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  console.log(`${id} ${s} at ${formattedTime}`);
};

io.on("connection", (socket) => {
  io.to(socket.id).emit("getID", socket.id);

  console.log(socket.id);
  PrintDate(socket.id, "connected");
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    PrintDate(socket.id, "disconnected");
  });
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with ID: ${socket.id} joined room ${data}`);
    io.to(socket.id).emit("roomName", data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_messages", data);
    console.log(`sending to ${JSON.stringify(data)}`, data.room)
  });
});

app.post('/login', (req, res) => {

})

server.listen(5055, () => {
  console.log("started at 5055");
});
