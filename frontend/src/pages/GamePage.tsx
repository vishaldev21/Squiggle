// import { useLocation, useParams } from "react-router-dom";
import Board from "../Components/Board";

function GamePage() {
  //   const params = useParams();
  //   const stateObj = useLocation();

  return (
    <div className="w-full h-screen">
      {/* navbar */}
      {/* board */}
      <Board />
      {/* leaderboard char */}
    </div>
  );
}
export default GamePage;
