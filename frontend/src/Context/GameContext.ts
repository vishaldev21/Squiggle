import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { TClients } from "./UserContext";

export type TLeaderBoardPlayerInfo = {
  name: string;
  ranking: number;
  points: number;
};

type TGameContext = {
  accessUser: TClients | null;
  setAccessUser: Dispatch<SetStateAction<TClients | null>>;
  playerLeaderBoard: TLeaderBoardPlayerInfo[] | [];
  setPlayerLeaderBoard: Dispatch<SetStateAction<TLeaderBoardPlayerInfo[] | []>>;
};

const GameContext = createContext<TGameContext>({
  accessUser: null,
  setAccessUser: () => {},
  playerLeaderBoard: [],
  setPlayerLeaderBoard: () => {},
});

const useGameContext = () => {
  return useContext(GameContext);
};

export { GameContext, useGameContext };
