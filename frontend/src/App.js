import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import './Components/HomePage'
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import LandingPage from "./Components/LandingPage";
import Cookies from 'js-cookie'
import Jobs from './Components/Jobs';
import IndividualJob from './Components/IndividualJob';
import CashierInterface from './Components/CashierInterface';
import axios from 'axios';

function App() {
  const [authenticated, setAuthenticaiton] = useState(Cookies.get('token') !== null);
  const [role, setRole] = useState('');
  const [currJob, setJob] = useState({});

  axios.get('http://localhost:8000/pos').catch(error => console.log('initCatch: ' + error)).then(response => console.log('response: ' + response))
  .catch(error => console.log('initCatch: ' + error));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='*' element={<HomePage />} />
          <Route path='login' element={<LoginPage authenticateHook={setAuthenticaiton} roleHook={setRole} />} />
          {authenticated && <Route path='landing' element={<LandingPage role={role} authenticateHook={setAuthenticaiton}/>} />}
          {(role === 'partpicker' || role === 'technician') && <Route path='jobs' element={<Jobs jobHook={setJob} />} />}
          {(role === 'partpicker' || role === 'technician') && <Route path='individualjob' element={<IndividualJob job={currJob} />} />}
          <Route path='cashier' element={<CashierInterface />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
