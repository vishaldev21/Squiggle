import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: [process.env.ORIGIN!],
  },
});

io.on("connection", (socket) => {
  console.log("connected", socket.id);
});

console.log(`listening on port ${process.env.PORT}`);
httpServer.listen(process.env.PORT);
