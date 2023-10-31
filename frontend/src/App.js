import logo from './logo.svg';
import './App.css';
import Login from './pages/Login/Login';
import Landing from './pages/Landing/Landing';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/Landing' element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
