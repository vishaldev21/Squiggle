import LeaderBoardCard from "./LeaderBoardCard";

function LeaderBoard() {
  return (
    <div className="w-1/2 h-full overflow-auto border-r space-y-2 p-2">
      <LeaderBoardCard ranking={1} name="Vishal" currentDrawingUser="" />
      <LeaderBoardCard ranking={1} name="Vishal" currentDrawingUser="" />
      <LeaderBoardCard ranking={1} name="Vishal" currentDrawingUser="" />
      <LeaderBoardCard ranking={1} name="Vishal" currentDrawingUser="" />
      <LeaderBoardCard ranking={1} name="Vishal" currentDrawingUser="" />
      <LeaderBoardCard ranking={1} name="Vishal" currentDrawingUser="" />
      <LeaderBoardCard ranking={1} name="Vishal" currentDrawingUser="" />
      <LeaderBoardCard ranking={1} name="Vishal" currentDrawingUser="" />
    </div>
  );
}

export default LeaderBoard;
