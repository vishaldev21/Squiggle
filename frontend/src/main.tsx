import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SocketContextProvider from "./Context/SocketContextProvider.tsx";
import UserContextProvider from "./Context/UserContextProvider.tsx";
import GameContextProvider from "./Context/GameContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketContextProvider>
      <UserContextProvider>
        <GameContextProvider>
          <App />
        </GameContextProvider>
      </UserContextProvider>
    </SocketContextProvider>
  </StrictMode>
);
