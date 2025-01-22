import { Link } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";
const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.userName.value);
    console.log(e.target.password.value);
  };
  return (
    <div id="page">
      <div className="loginPage">
        <h1>Plain Chat</h1>
        <h3>Login</h3>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="userName">Username:</label> <br />
          <input
            id="userName"
            type="text"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label> <br />
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button>Login</button>
            <Link to="/signUpPage">Dont have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
