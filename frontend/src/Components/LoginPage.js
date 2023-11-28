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

  const handleLogin = () => {
    axios
      .post("http://LocalHost:8000/login", {
        email: username,
        password: password,
      })
      .then(function (response) {
        console.log("Login response:", response);
        const { token, role } = response.data;
        console.log("Token:", token, "Role:", role);
        if (token) {
          props.authenticateHook(true);
          props.roleHook(role);
          nav("/landing");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setInvalid(true);
      });
  };

  return (
    <div className="loginPageContainer">
      <div className="loginForm">
        <h1>Login Page</h1>
        {invalid && (
          <div className="errorMessage">
            <p>Invalid Username or Password</p>
          </div>
        )}
        <div className="loginFormField">
          <p>Email</p>
          <input onChange={handleChangeUsername} />
        </div>
        <div className="loginFormField">
          <p>Password</p>
          <input type="password" onChange={handleChangePassword} />
        </div>
        <button id="loginBtn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
