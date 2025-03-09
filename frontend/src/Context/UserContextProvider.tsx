import { ReactNode, useState } from "react";
import { UserContext } from "./UserContext";

function UserContextProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
