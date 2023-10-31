import React from "react";
import {useNavigate } from "react-router-dom";



const Login = () => {
    const navigate = useNavigate();
    return(<div>
        <p>Username</p>
        <input></input>
        <p>Password</p>
        <input></input>
        <br />
        <button onClick={() => {navigate('/Landing')}}>Sign In</button>
    </div>);
}
export default Login;