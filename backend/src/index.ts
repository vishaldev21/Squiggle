import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import { ACTIONS } from "./Action.js";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: [process.env.ORIGIN!],
  },
});

const userSocketMap: Record<string, string> = {};
function getAllConnectedClients(roomId: string) {
  // io.sockets.adapter.rooms.get(roomId) will return Map and here we are converting it to array
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId: string) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    console.log(roomId, username);
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    console.log({ clients });
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });
  socket.on(ACTIONS.SEND_MESSAGE, ({ user, message, declaration, roomId }) => {
    socket
      .to(roomId)
      .emit(ACTIONS.SEND_MESSAGE, { user, message, declaration });
  });
  socket.on(ACTIONS.LEADERBOARD_INFO, ({ socketId, leaderBoard }) => {
    io.to(socketId).emit(ACTIONS.LEADERBOARD_INFO, { leaderBoard });
  });
});

console.log(`listening on port ${process.env.PORT}`);
httpServer.listen(process.env.PORT);
