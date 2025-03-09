import { ReactNode, useState } from "react";
import { SocketContext } from "./SocketContext";
import { Socket } from "socket.io-client";

function SocketContextProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
