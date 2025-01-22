import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ChatPage />} />
        <Route exact path="loginPage" element={<LoginPage />} />
        <Route exact path="signUpPage" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
