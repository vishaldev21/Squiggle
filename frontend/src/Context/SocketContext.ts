import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Socket } from "socket.io-client";

type TSocketContext = {
  socket: Socket | null;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
};

const SocketContext = createContext<TSocketContext>({
  socket: null,
  setSocket: () => {},
});

const useSocketContext = () => {
  return useContext(SocketContext);
};

export { SocketContext, useSocketContext };
