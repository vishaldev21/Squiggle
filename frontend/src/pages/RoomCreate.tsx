import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserContext } from "../Context/UserContext";
import { useGameContext } from "../Context/GameContext";
import { v4 as uuidv4 } from "uuid";
import { uniqueNamesGenerator, names } from "unique-names-generator";

function RoomCreate() {
  const [roomName, setRoomName] = useState("");
  const { setUsername: setUsernameContext } = useUserContext();
  const navigate = useNavigate();
  const { setPlayerLeaderBoard } = useGameContext();

  const createRoom = () => {
    const userName = uniqueNamesGenerator({
      dictionaries: [names],
      length: 1,
    });
    setUsernameContext(userName);
    const generatedRoomName = uuidv4().split("-")[0];
    setPlayerLeaderBoard([
      { name: userName, points: 0, ranking: 1, gotCorrect: false },
    ]);
    navigator.clipboard.writeText(generatedRoomName);
    toast.success("Room name copied");
    navigate(`/${generatedRoomName}`);
  };

  const joinRoom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const userName = uniqueNamesGenerator({
      dictionaries: [names],
      length: 1,
    });
    setUsernameContext(userName);
    navigate(`/${roomName}`);
  };

  return (
    <div className="min-h-screen bg-base-300 flex justify-center items-center">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
          <div className="form-control flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter room id"
              className="input w-full"
              required
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button className="btn btn-primary" onClick={(e) => joinRoom(e)}>
              Join
            </button>
          </div>
          <div className="divider my-0">OR</div>
          <button className="btn" onClick={() => createRoom()}>
            Create a room
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomCreate;
