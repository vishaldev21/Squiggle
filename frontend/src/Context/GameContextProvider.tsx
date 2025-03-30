import { ReactNode, useState } from "react";
import { GameContext, TLeaderBoardPlayerInfo } from "./GameContext";
import { TClients } from "./UserContext";

function GameContextProvider({ children }: { children: ReactNode }) {
  const [accessUser, setAccessUser] = useState<TClients | null>(null);
  const [playerLeaderBoard, setPlayerLeaderBoard] = useState<
    TLeaderBoardPlayerInfo[] | []
  >([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [guessWord, setGuessWord] = useState<string | null>(null);
  return (
    <GameContext.Provider
      value={{
        accessUser,
        setAccessUser,
        playerLeaderBoard,
        setPlayerLeaderBoard,
        gameStarted,
        setGameStarted,
        guessWord,
        setGuessWord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
