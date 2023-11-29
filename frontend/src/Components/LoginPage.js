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
        <button
          id="loginBtn"
          onClick={() => {
            axios
              .post("http://LocalHost:8000/login", {
                email: username,
                password: password,
              })
              .catch(() => {
                console.log("problem :(");
              })
              .then(function (response) {
                Cookies.set("token", response.data["token"]);
                if (!(response.data["token"] === ""))
                  props.authenticateHook(true);
                props.roleHook("technician");
                nav("/landing");
              })
              .catch(() => {
                setInvalid(true);
              });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
export default LoginPage;
