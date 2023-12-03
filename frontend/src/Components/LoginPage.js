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
        // Store user information in cookies
        Cookies.set("token", response.data["token"]);
        Cookies.set("userInfo", JSON.stringify(response.data["user_info"]));
        // Update authentication and role state
        props.authenticateHook(true);
        props.roleHook(response.data["user_info"].role);
        nav("/landing");
        console.log(response);
      })
      .catch(() => {
        // Handle login failure
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
