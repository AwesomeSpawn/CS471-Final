import {useNavigate} from 'react-router-dom'

function HomePage() {
    const nav = useNavigate();
    return(
        <div>
            <h1>Home Page</h1>
            <button onClick={() => {nav("login")}}>Login Page</button>
        </div>
    ); 

}

export default HomePage;