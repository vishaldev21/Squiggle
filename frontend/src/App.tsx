import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomCreate from "./pages/RoomCreate";
import GamePage from "./pages/GamePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<RoomCreate />} />
        <Route path="/:roomId" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
