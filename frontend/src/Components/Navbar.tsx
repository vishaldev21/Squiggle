import { FcAlarmClock } from "react-icons/fc";
import { useUserContext } from "../Context/UserContext";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { useGameContext } from "../Context/GameContext";
import { useSocketContext } from "../Context/SocketContext";
import { ACTIONS } from "../utils/Actions";
import { useParams } from "react-router-dom";
import { generateRandomWords } from "../utils/randomWordsGenerator";

function Navbar() {
  const { clients, username } = useUserContext();
  const [roundCount, setRoundCount] = useState(0);
  const {
    gameStarted,
    setGameStarted,
    setGuessWord,
    accessUser,
    guessWord,
    setAccessUser,
  } = useGameContext();
  const { socket } = useSocketContext();
  const { roomId } = useParams();
  const [time, setTime] = useState(60);

  const startCountdown = useCallback(
    (seconds: number) => {
      const interval = setInterval(() => {
        if (seconds === 0) {
          clearInterval(interval);
          if (accessUser?.username === username && clients) {
            const currentIndex = clients.findIndex(
              (el) => el.username === accessUser.username
            );
            if (currentIndex < clients.length - 1) {
              const currentClient = clients[currentIndex + 1];
              console.log("currentClient", currentClient);
              setAccessUser(currentClient);
              socket?.emit(ACTIONS.TIME_UP, {
                roomId,
                user: currentClient,
              });
              socket?.emit(ACTIONS.GENERATE_WORD, {
                socketId: currentClient.socketId,
              });
              socket?.emit(ACTIONS.REFRESH_BOARD, { roomId });
            }
          }
        } else {
          seconds--;
          setTime(seconds);
        }
      }, 1000);
    },
    [accessUser?.username, clients, roomId, setAccessUser, socket, username]
  );

  const roundStarter = useCallback(() => {
    setRoundCount((pre) => pre + 1);
    socket?.emit(ACTIONS.INCREASE_ROUND_COUNT, { roomId });
    // random word will be generated saved locally and send to everyone
    const randomWord = generateRandomWords(1);
    setGuessWord(randomWord);
    socket?.emit(ACTIONS.GUESS_WORD, { guessWord: randomWord, roomId });
    startCountdown(60);
    socket?.emit(ACTIONS.COUNTDOWN_START, { roomId });
  }, [roomId, setGuessWord, socket, startCountdown]);

  const clickHandler = () => {
    if (clients && clients.length <= 1) {
      toast.error("Room has only 1 player");
      return;
    }
    // gameStatus in context will be marked as started and no one will be allowed to join
    setGameStarted(true);
    socket?.emit(ACTIONS.GAME_STARTED, { roomId });
    roundStarter();
  };

  useEffect(() => {
    socket?.on(ACTIONS.GAME_STARTED, () => {
      setGameStarted(true);
    });

    socket?.on(ACTIONS.INCREASE_ROUND_COUNT, () => {
      setRoundCount((pre) => pre + 1);
    });

    socket?.on(ACTIONS.GUESS_WORD, ({ guessWord }) => {
      setGuessWord(guessWord);
    });

    socket?.on(ACTIONS.COUNTDOWN_START, () => {
      startCountdown(60);
    });

    socket?.on(ACTIONS.TIME_UP, ({ user }) => {
      setAccessUser(user);
    });

    socket?.on(ACTIONS.GENERATE_WORD, () => {
      roundStarter();
    });

    return () => {
      socket?.off(ACTIONS.GAME_STARTED);
      socket?.off(ACTIONS.INCREASE_ROUND_COUNT);
      socket?.off(ACTIONS.GUESS_WORD);
      socket?.off(ACTIONS.COUNTDOWN_START);
      socket?.off(ACTIONS.TIME_UP);
      socket?.off(ACTIONS.GENERATE_WORD);
    };
  }, [
    roundStarter,
    setAccessUser,
    setGameStarted,
    setGuessWord,
    socket,
    startCountdown,
  ]);

  return (
    <div className="h-[8vh] p-2 flex">
      <div className="flex gap-8 items-center">
        <div className="flex gap-2 items-center">
          <FcAlarmClock className="text-2xl" />
          <p>{time}</p>
        </div>
        <p>{`Round: ${roundCount}/${clients?.length}`}</p>
      </div>
      {guessWord ? (
        <div className="mx-auto h-full flex flex-col justify-center">
          <p className="font-bold">{`${
            accessUser?.username === username ? "Draw this" : "Guess this"
          }`}</p>
          <div className="flex gap-2 h-full ml-2">
            {accessUser?.username === username
              ? `${guessWord}`
              : Array(guessWord?.length)
                  .fill(1)
                  .map((el, index) => (
                    <p
                      key={index * el}
                      className="text-neutral-content font-extrabold text-xl"
                    >
                      -
                    </p>
                  ))}
          </div>
        </div>
      ) : (
        <p className="mx-auto my-auto font-bold">Waiting...</p>
      )}

      {clients && clients[0]?.username === username && !gameStarted && (
        <button className="btn btn-success" onClick={() => clickHandler()}>
          Start
        </button>
      )}
    </div>
  );
}

export default Navbar;
