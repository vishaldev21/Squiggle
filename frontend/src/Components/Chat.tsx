import { useEffect, useState } from "react";
import { useSocketContext } from "../Context/SocketContext";
import ChatCard from "./ChatCard";
import { ACTIONS } from "../utils/Actions";
import { useUserContext } from "../Context/UserContext";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useGameContext } from "../Context/GameContext";

type TMessage = {
  user: string;
  message: string;
  declaration: boolean;
};

function Chat() {
  const { socket } = useSocketContext();
  const { username, setClients, clients } = useUserContext();
  const { roomId } = useParams();
  const [chats, setChats] = useState<TMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const {
    accessUser,
    setAccessUser,
    setPlayerLeaderBoard,
    playerLeaderBoard,
    guessWord,
  } = useGameContext();

  const submitHandler = (socket: Socket | null) => {
    if (!username || !socket) {
      return;
    }
    if (!message.trim()) return;
    if (message.toLowerCase() === guessWord) {
      const newLeaderBoard = playerLeaderBoard.map((el) => {
        if (el.name === username) {
          el.gotCorrect = true;
          el.points = el.points + 100;
        }
        if (el.name === accessUser?.username && clients) {
          el.points = el.points + 100 / clients.length;
        }
        return el;
      });
      setPlayerLeaderBoard(newLeaderBoard);
      socket.emit(ACTIONS.CORRECT_ANSWER, { username, roomId });
      return;
    }
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
      socket.on(
        ACTIONS.JOINED,
        ({ clients, username: userJoined, socketId }) => {
          setClients(clients);
          setAccessUser(clients[0]);
          if (userJoined !== username) {
            setPlayerLeaderBoard((pre) => [
              ...pre,
              {
                name: userJoined,
                ranking: playerLeaderBoard.length + 1,
                points: 0,
                gotCorrect: false,
              },
            ]);
            if (clients[0]?.username === username) {
              socket.emit(ACTIONS.LEADERBOARD_INFO, {
                socketId,
                leaderBoard: [
                  ...playerLeaderBoard,
                  {
                    name: userJoined,
                    ranking: playerLeaderBoard.length + 1,
                    points: 0,
                  },
                ],
              });
            }
            setChats((pre) => [
              ...pre,
              {
                user: userJoined,
                message: `${userJoined} joined`,
                declaration: true,
              },
            ]);
          }
        }
      );
      socket.on(ACTIONS.LEADERBOARD_INFO, ({ leaderBoard }) => {
        setPlayerLeaderBoard(leaderBoard);
      });
      socket.on(ACTIONS.SEND_MESSAGE, ({ user, message, declaration }) => {
        if (user !== username) {
          setChats((pre) => [...pre, { user, message, declaration }]);
        }
      });
    }
    return () => {
      socket?.off(ACTIONS.JOINED);
      socket?.off(ACTIONS.LEADERBOARD_INFO);
      socket?.off(ACTIONS.SEND_MESSAGE);
    };
  }, [
    playerLeaderBoard,
    setAccessUser,
    setClients,
    setPlayerLeaderBoard,
    socket,
    username,
  ]);
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
          disabled={accessUser?.username === username}
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
