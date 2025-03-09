import { generateSlug } from "random-word-slugs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserContext } from "../Context/UserContext";

function RoomCreate() {
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const { setUsername: setUsernameContext } = useUserContext();
  const navigate = useNavigate();

  const createRoom = () => {
    if (userName === "") {
      toast.error("Please provide your name");
      return;
    }
    setUsernameContext(userName);
    const generatedRoomName = generateSlug(2);
    navigate(`/${generatedRoomName}`);
  };

  const joinRoom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (userName === "") {
      toast.error("Please provide your name");
      return;
    }
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
              placeholder="Enter your name"
              className="input w-full"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
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
