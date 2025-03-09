import { randomAvatarGenerator } from "../utils/randomAvatar";

type TProps = {
  ranking: number;
  name: string;
  currentDrawingUser: string;
};
function LeaderBoardCard({ ranking, name, currentDrawingUser }: TProps) {
  return (
    <div className="w-full flex justify-between items-center bg-base-300 p-4">
      <p>{`#${ranking}`}</p>
      <p>{`${name} ${currentDrawingUser}`}</p>
      <div>
        <img src={randomAvatarGenerator()} alt="" className="w-10 h-10" />
      </div>
    </div>
  );
}

export default LeaderBoardCard;
