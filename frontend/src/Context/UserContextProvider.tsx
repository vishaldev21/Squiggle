import { ReactNode, useState } from "react";
import { TClients, UserContext } from "./UserContext";

function UserContextProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [clients, setClients] = useState<TClients[] | null>(null);
  return (
    <UserContext.Provider
      value={{ username, setUsername, clients, setClients }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
