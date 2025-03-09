import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SocketContextProvider from "./Context/SocketContextProvider.tsx";
import UserContextProvider from "./Context/UserContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </SocketContextProvider>
  </StrictMode>
);
