import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import './Components/HomePage'
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import LandingPage from "./Components/LandingPage";
import JobsPage from './Components/JobsPage';

function App() {
  const [authenticated, setAuthenticaiton] = useState(false);
  const [role, setRole] = useState('');
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='*' element={<HomePage />} />
          <Route path='login' element={<LoginPage authenticateHook={setAuthenticaiton} roleHook={setRole} />} />
          {authenticated && <Route path='landing' element={<LandingPage role={role}/>} />}
          {(role === 'manager' || role === 'partpicker' || role === 'technician') && <Route path='jobs' element={<JobsPage />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
