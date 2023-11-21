import {useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

function LoginPage(props) {
    const nav = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);

    const handleChangeUsername = event => {
        setUsername(event.target.value);
    }

    const handleChangePassword = event => {
        setPassword(event.target.value);
    }

    return(
        <div>
            <h1>Login Page</h1>
            {invalid ? <div><p>Invalid Username</p><br /></div> : <div><br /></div>}
            <p>Email</p>
            <input onChange={handleChangeUsername}></input>
            <p>Password</p>
            <input onChange={handleChangePassword}></input>
            <br></br>
            <button onClick={(event) => {
                axios.post('http://LocalHost:8000/login', {
                    'email':username,
                    'password':password
                }).catch(() => {console.log("problem :(")})
                .then(function (response) {
                    Cookies.set('token', response.data['token']);
                    if (!(response.data['token'] === '')) props.authenticateHook(true);
                    props.roleHook(response.data['role']);
                    nav('/landing');
                }).catch(() => {setInvalid(true)});
            }}>Login</button>
        </div>
    );

}

export default LoginPage;