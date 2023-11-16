import logo from './logo.svg';
import axios from "axios";
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import './Components/HomePage'
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
