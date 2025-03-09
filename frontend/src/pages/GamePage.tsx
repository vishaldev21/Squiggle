// import { useLocation, useParams } from "react-router-dom";
import Board from "../Components/Board";
import Chat from "../Components/Chat";
import LeaderBoard from "../Components/LeaderBoard";
import Navbar from "../Components/Navbar";

function GamePage() {
  //   const params = useParams();
  //   const stateObj = useLocation();

  return (
    <div className="w-full max-h-screen">
      {/* navbar */}
      <Navbar />
      {/* board */}
      <div className="w-full border-b border-base-300">
        <Board />
      </div>
      {/* leaderboard char */}
      <div className="w-full flex h-[45vh]">
        <LeaderBoard />
        <Chat />
      </div>
    </div>
  );
}
export default GamePage;
