import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage(props) {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    axios
      .post("http://LocalHost:8000/login", {
        email: username,
        password: password,
      })
      .then(function (response) {
        Cookies.set("token", response.data["token"]);
        if (response.data["token"] !== "") {
          props.authenticateHook(true);
          props.roleHook("employee");
          nav("/landing");
        }
      })
      .catch(() => {
        setInvalid(true);
      });
  };

  return (
    <div className="loginPageContainer">
      <div className="loginForm">
        <h1>Login</h1>
        {invalid && (
          <p className="errorMessage">Invalid Username or Password</p>
        )}
        <div className="loginFormField">
          <input
            type="email"
            placeholder="Email"
            onChange={handleChangeUsername}
          />
        </div>
        <div className="loginFormField">
          <input
            type="password"
            placeholder="Password"
            onChange={handleChangePassword}
          />
        </div>
        <button id="loginBtn" onClick={handleLogin}>
          Login
        </button>
        <button id="backBtn" onClick={() => nav("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
