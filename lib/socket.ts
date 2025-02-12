const { Server: SocketServer } = require("socket.io");
const { Server: HTTPServer } = require("http");
const { Server: HTTPSServer } = require("https");

function initSocket(server) {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    path: "/socket.io",
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("leave", (roomId) => {
      socket.leave(roomId);
      console.log(`User left room: ${roomId}`);
    });

    socket.on("message", async (data) => {
      io.to(data.roomId).emit("message", data);
      console.log(`Message sent in room: ${data.roomId}`);
    });

    socket.on("call-offer", ({ offer, to, from }) => {
      socket.broadcast.to(to).emit("call-offer", { offer, from });
    });

    socket.on("call-answer", ({ answer, to }) => {
      socket.broadcast.to(to).emit("call-answer", { answer, from: socket.id });
    });

    socket.on("ice-candidate", ({ candidate, to }) => {
      socket.broadcast.to(to).emit("ice-candidate", { candidate, from: socket.id });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = { initSocket };
