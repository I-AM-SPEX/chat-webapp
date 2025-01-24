import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="signUpPage" element={<SignUpPage />} />
        <Route exact path="chatPage" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
