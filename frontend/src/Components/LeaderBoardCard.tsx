import { randomAvatarGenerator } from "../utils/randomAvatar";

type TProps = {
  ranking: number;
  name: string;
  gotCorrect: boolean;
  points: number;
};
function LeaderBoardCard({ ranking, name, gotCorrect, points }: TProps) {
  return (
    <div
      className={`w-full flex justify-between items-center ${
        gotCorrect ? "bg-success-content" : "bg-base-300"
      } p-2 rounded`}
    >
      <p className="text-sm w-fit">{`#${ranking}`}</p>
      <div className="w-1/2">
        <p className="text-sm truncate w-full text-center">{name}</p>
        <p className="text-sm w-full text-center">{`${points} points`}</p>
      </div>
      <div className="w-1/4">
        <img
          src={randomAvatarGenerator()}
          alt=""
          className="w-8 h-8 sm:w-10 sm:h-10"
        />
      </div>
    </div>
  );
}

export default LeaderBoardCard;
