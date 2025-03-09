import { createContext, Dispatch, SetStateAction, useContext } from "react";

type TUserContext = {
  username: string | null;
  setUsername: Dispatch<SetStateAction<string | null>>;
};

const UserContext = createContext<TUserContext>({
  username: null,
  setUsername: () => {},
});

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, useUserContext };
