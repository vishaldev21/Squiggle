import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { TClients } from "./UserContext";
import { TLEditorSnapshot } from "tldraw";

export type TLeaderBoardPlayerInfo = {
  name: string;
  ranking: number;
  points: number;
  gotCorrect: boolean;
};

type TGameContext = {
  accessUser: TClients | null;
  setAccessUser: Dispatch<SetStateAction<TClients | null>>;
  playerLeaderBoard: TLeaderBoardPlayerInfo[] | [];
  setPlayerLeaderBoard: Dispatch<SetStateAction<TLeaderBoardPlayerInfo[] | []>>;
  gameStarted: boolean;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
  guessWord: string | null;
  setGuessWord: Dispatch<SetStateAction<string | null>>;
  initialBoardState: TLEditorSnapshot | null;
  setInitialBoardState: Dispatch<SetStateAction<TLEditorSnapshot | null>>;
};

const GameContext = createContext<TGameContext>({
  accessUser: null,
  setAccessUser: () => {},
  playerLeaderBoard: [],
  setPlayerLeaderBoard: () => {},
  gameStarted: false,
  setGameStarted: () => {},
  guessWord: null,
  setGuessWord: () => {},
  initialBoardState: null,
  setInitialBoardState: () => {},
});

const useGameContext = () => {
  return useContext(GameContext);
};

export { GameContext, useGameContext };
