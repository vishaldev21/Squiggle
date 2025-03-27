import { useGameContext } from "../Context/GameContext";
import LeaderBoardCard from "./LeaderBoardCard";

function LeaderBoard() {
  const { playerLeaderBoard } = useGameContext();
  return (
    <div className="w-1/2 h-full overflow-auto border-r space-y-2 p-2">
      {playerLeaderBoard.map((el) => (
        <LeaderBoardCard
          ranking={el.ranking}
          name={el.name}
          points={el.points}
          currentDrawingUser=""
        />
      ))}
    </div>
  );
}

export default LeaderBoard;
