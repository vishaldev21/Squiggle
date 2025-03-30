import { useEffect } from "react";
import { useGameContext } from "../Context/GameContext";
import LeaderBoardCard from "./LeaderBoardCard";
import { useSocketContext } from "../Context/SocketContext";
import { ACTIONS } from "../utils/Actions";
import { useUserContext } from "../Context/UserContext";

function LeaderBoard() {
  const { playerLeaderBoard, setPlayerLeaderBoard, accessUser } =
    useGameContext();
  const { socket } = useSocketContext();
  const { clients } = useUserContext();

  useEffect(() => {
    socket?.on(ACTIONS.CORRECT_ANSWER, ({ username }) => {
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
    });

    return () => {
      socket?.off(ACTIONS.CORRECT_ANSWER);
    };
  }, [playerLeaderBoard, setPlayerLeaderBoard, socket]);
  return (
    <div className="w-1/2 h-full overflow-auto border-r space-y-2 p-2">
      {playerLeaderBoard.map((el) => (
        <LeaderBoardCard
          ranking={el.ranking}
          name={el.name}
          points={el.points}
          gotCorrect={el.gotCorrect}
        />
      ))}
    </div>
  );
}

export default LeaderBoard;
