import {useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {redirect} from 'react-router-dom'

function LoginPage() {

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
            <p>Username</p>
            <input onChange={handleChangeUsername}></input>
            <p>Password</p>
            <input onChange={handleChangePassword}></input>
            <br></br>
            <button onClick={(event) => {
                axios.get('https://LocalHost:8000/login', {
                    'username':username,
                    'password':password
                }).then(function (response) {
                    Cookies.set('token', response.data['token'])
                }).catch(setInvalid(true));
            }}>Login</button>
        </div>
    );

}

export default LoginPage;