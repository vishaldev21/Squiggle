import { randomAvatarGenerator } from "../utils/randomAvatar";

type TProps = {
  ranking: number;
  name: string;
  currentDrawingUser: string;
  points: number;
};
function LeaderBoardCard({
  ranking,
  name,
  currentDrawingUser,
  points,
}: TProps) {
  return (
    <div className="w-full flex justify-between items-center bg-base-300 p-4">
      <p>{`#${ranking}`}</p>
      <div>
        <p>{`${name} ${currentDrawingUser}`}</p>
        <p>{`${points} points`}</p>
      </div>
      <div>
        <img src={randomAvatarGenerator()} alt="" className="w-10 h-10" />
      </div>
    </div>
  );
}

export default LeaderBoardCard;
