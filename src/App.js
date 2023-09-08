import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <NoteState>
      <Router>
        <div className="container my-3">
          <Navbar />
          <div className="container my-3">
            <Alert message="sathwik and adwi" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
