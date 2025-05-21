import Login from "./Login";
import Homepage from "./Homepage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={"login"} element={<Login />} />
      <Route path={"homepage"} element={<Homepage />} />
      <Route path={"login/homepage"} element={<Homepage />} />
      <Route path={"movies"} element={<Homepage />} />
      <Route path={"*"} element={<Login />} />
    </Routes>
  );
}

export default App;
