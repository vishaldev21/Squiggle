import { FcAlarmClock } from "react-icons/fc";

function Navbar() {
  return (
    <div className="h-[8vh] p-2 flex">
      <div className="flex gap-2 items-center">
        <FcAlarmClock className="text-2xl" />
        <p>60</p>
      </div>
      <div className="mx-auto h-full flex flex-col justify-center">
        <p className="font-bold">Guess this</p>
        <div className="flex gap-2 h-full ml-2">
          <p className="text-neutral-content font-extrabold text-xl">-</p>
          <p className="text-neutral-content font-extrabold text-xl">-</p>
          <p className="text-neutral-content font-extrabold text-xl">-</p>
          <p className="text-neutral-content font-extrabold text-xl">-</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
