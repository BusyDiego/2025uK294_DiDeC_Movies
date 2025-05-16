import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage.tsx";
import Login from "./Login.tsx";

function App() {
  return (
    <Router>
      <div>
        <Login />
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
