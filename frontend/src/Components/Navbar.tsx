import { FcAlarmClock } from "react-icons/fc";
import { useUserContext } from "../Context/UserContext";
import toast from "react-hot-toast";
import { useState } from "react";

function Navbar() {
  const { clients, username } = useUserContext();
  const [roundCount, setRoundCount] = useState(0);
  const clickHandler = () => {
    if (clients && clients.length <= 1) {
      toast.error("Room has only 1 player");
      return;
    }
    // add rest logic
  };
  console.log("navbar", clients);
  return (
    <div className="h-[8vh] p-2 flex">
      <div className="flex gap-8 items-center">
        <div className="flex gap-2 items-center">
          <FcAlarmClock className="text-2xl" />
          <p>60</p>
        </div>
        <p>{`Round: ${roundCount}/${clients?.length}`}</p>
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
      {clients && clients[0]?.username === username && (
        <button className="btn btn-success" onClick={() => clickHandler()}>
          Start
        </button>
      )}
    </div>
  );
}

export default Navbar;
