import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';

function HomePage() {
    const nav = useNavigate();
    return(
        <div>
            <h1>Home Page</h1>
            <button onClick={() => {(Cookies.get('token')) ? nav('/landing'): nav("/login")}}>Login Page</button>
        </div>
    ); 

}

export default HomePage;