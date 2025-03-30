import { randomAvatarGenerator } from "../utils/randomAvatar";

type TProps = {
  ranking: number;
  name: string;
  gotCorrect: boolean;
  points: number;
};
function LeaderBoardCard({ ranking, name, gotCorrect, points }: TProps) {
  console.log("val", gotCorrect);
  return (
    <div
      className={`w-full flex justify-between items-center ${
        gotCorrect ? "bg-success-content" : "bg-base-300"
      } p-4`}
    >
      <p>{`#${ranking}`}</p>
      <div>
        <p>{name}</p>
        <p>{`${points} points`}</p>
      </div>
      <div>
        <img src={randomAvatarGenerator()} alt="" className="w-10 h-10" />
      </div>
    </div>
  );
}

export default LeaderBoardCard;
