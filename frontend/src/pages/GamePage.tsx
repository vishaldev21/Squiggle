import { useParams } from "react-router-dom";
import Board from "../Components/Board";
import Chat from "../Components/Chat";
import LeaderBoard from "../Components/LeaderBoard";
import Navbar from "../Components/Navbar";
import { useEffect } from "react";
import { initSocket } from "../utils/socket";
import { useSocketContext } from "../Context/SocketContext";
import { ACTIONS } from "../utils/Actions";
import { useUserContext } from "../Context/UserContext";

function GamePage() {
  const { roomId } = useParams();
  const { setSocket } = useSocketContext();
  const { username } = useUserContext();

  useEffect(() => {
    const socketConnection = initSocket();
    if (socketConnection) {
      setSocket(socketConnection);
    }
    socketConnection.emit(ACTIONS.JOIN, {
      roomId,
      username,
    });
    return () => {
      socketConnection.disconnect();
    };
  }, [roomId, setSocket, username]);

  return (
    <div className="w-full max-h-screen">
      {/* navbar */}
      <Navbar />
      {/* board */}
      <div className="w-full border-b border-base-300">
        <Board />
      </div>
      {/* leaderboard char */}
      <div className="w-full flex h-[41vh]">
        <LeaderBoard />
        <Chat />
      </div>
    </div>
  );
}
export default GamePage;
