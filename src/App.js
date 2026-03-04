import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import LoginSignup from "./pages/login";
import Signup from "./pages/signup";
import Chat from "./pages/chat";  // FIXED (Capital C)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} /> 
      </Routes>
    </Router>
  );
}

export default App;
