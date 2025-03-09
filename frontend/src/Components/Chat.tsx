import { useEffect, useState } from "react";
import { useSocketContext } from "../Context/SocketContext";
import ChatCard from "./ChatCard";
import { ACTIONS } from "../utils/Actions";
import { useUserContext } from "../Context/UserContext";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";

type TMessage = {
  user: string;
  message: string;
  declaration: boolean;
};

function Chat() {
  const { socket } = useSocketContext();
  const { username } = useUserContext();
  const { roomId } = useParams();
  const [chats, setChats] = useState<TMessage[]>([]);
  const [message, setMessage] = useState<string>("");

  const submitHandler = (socket: Socket | null) => {
    if (!username || !socket) {
      return;
    }
    if (!message.trim()) return;
    socket.emit(ACTIONS.SEND_MESSAGE, {
      user: username,
      message,
      declaration: false,
      roomId: roomId,
    });
    setChats((pre) => [
      ...pre,
      { user: username, declaration: false, message },
    ]);
    setMessage("");
  };

  useEffect(() => {
    if (socket) {
      socket.on(ACTIONS.JOINED, ({ username: userJoined }) => {
        if (userJoined !== username) {
          setChats((pre) => [
            ...pre,
            {
              user: userJoined,
              message: `${userJoined} joined`,
              declaration: true,
            },
          ]);
        }
      });

      socket.on(ACTIONS.SEND_MESSAGE, ({ user, message, declaration }) => {
        if (user !== username) {
          setChats((pre) => [...pre, { user, message, declaration }]);
        }
      });
    }
  }, [socket, username]);
  return (
    <div className="w-1/2 h-full relative">
      <div className="h-[80%] overflow-auto space-y-2 p-2">
        {chats.length > 0 &&
          chats.map((el, index) => (
            <ChatCard
              key={index}
              user={el.user}
              message={el.message}
              declaration={el.declaration}
            />
          ))}
      </div>
      <div className="bottom-3 absolute w-full flex justify-center">
        <input
          type="text"
          placeholder="Enter your message"
          className="input w-3/4 mx-auto"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitHandler(socket)}
        />
      </div>
    </div>
  );
}

export default Chat;
