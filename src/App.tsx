import { BrowserRouter, Route, Routes } from "react-router";
import Game from "./modules/game";
import Home from "./modules/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
