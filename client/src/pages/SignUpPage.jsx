import { Link } from "react-router-dom";

import "./SignUpPage.css";
import { useState } from "react";
const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.userName.value);
    console.log(e.target.password.value);
  };
  return (
    <div id="page">
      <div className="signUpPage">
        <h1>Plain Chat</h1>
        <h3>Sign Up</h3>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="userName">Username:</label> <br />
          <input
            id="userName"
            type="text"
            name="userName"
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
            <button type="submit">Sign Up</button>
            <Link to="/loginPage">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
