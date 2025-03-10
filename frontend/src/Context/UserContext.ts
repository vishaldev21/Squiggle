import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type TClients = {
  socketId: string;
  username: string;
};

type TUserContext = {
  username: string | null;
  setUsername: Dispatch<SetStateAction<string | null>>;
  clients: TClients[] | null;
  setClients: Dispatch<SetStateAction<TClients[] | null>>;
};

const UserContext = createContext<TUserContext>({
  username: null,
  setUsername: () => {},
  clients: null,
  setClients: () => {},
});

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, useUserContext };
