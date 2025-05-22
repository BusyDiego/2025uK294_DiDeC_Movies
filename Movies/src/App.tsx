import Login from "./Login";
import Homepage from "./Homepage";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import RetroSun from "./RetroSun";
import Register from "./Register";

function App() {
  return (
    <>
      <img
        src="/src/assets/toppng.com-vaporwave-palm-tree-469x517.png"
        alt="Vaporwave Palme links"
        className="palm-left"
      />
      <img
        src="/src/assets/toppng.com-vaporwave-palm-tree-469x517.png"
        alt="Vaporwave Palme rechts"
        className="palm-right"
      />
      <RetroSun />

      <Routes>
        <Route path={"login"} element={<Login />} />
        <Route path={"homepage"} element={<Homepage />} />
        <Route path={"login/homepage"} element={<Homepage />} />
        <Route path={"movies"} element={<Homepage />} />
        <Route path={"*"} element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
