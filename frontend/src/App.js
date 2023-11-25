import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import './Components/HomePage'
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import LandingPage from "./Components/LandingPage";
import Cookies from 'js-cookie'
import Jobs from './Components/Jobs';

function App() {
  const [authenticated, setAuthenticaiton] = useState(Cookies.get('token') !== null);
  const [role, setRole] = useState('');
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='*' element={<HomePage />} />
          <Route path='login' element={<LoginPage authenticateHook={setAuthenticaiton} roleHook={setRole} />} />
          {authenticated && <Route path='landing' element={<LandingPage role={role} authenticateHook={setAuthenticaiton}/>} />}
          {(role === 'manager' || role === 'partpicker' || role === 'technician') && <Route path='jobs' element={<Jobs />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
