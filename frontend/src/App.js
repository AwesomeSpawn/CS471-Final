import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import LandingPage from "./Components/LandingPage";
import TimesheetPage from "./Components/TimesheetPage";
import JobsPage from "./Components/JobsPage";
import TimesheetManage from "./Components/TimesheetManagePage";
import JobsManage from "./Components/JobsManagePage";
import InventoryManage from "./Components/InventoryManagePage"; 
import Cookies from 'js-cookie';
import Jobs from './Components/JobsPage';
import IndividualJob from './Components/IndividualJob';
import CashierInterface from './Components/CashierInterfacePage';

function App() {
  const [authenticated, setAuthentication] = useState(Cookies.get('token') !== null);
  const [role, setRole] = useState('');
  const [currJob, setJob] = useState({});

  useEffect(() => {
    if (!authenticated) {
      const isAuthenticated = localStorage.getItem("authenticated");
      if (isAuthenticated) {
        setAuthentication(true);
      }
    }

    if (!role) {
      const userRole = localStorage.getItem("role");
      if (userRole) {
        setRole(userRole);
      }
    }
  }, [authenticated, role]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          <Route
            path="login"
            element={
              <LoginPage
                authenticateHook={setAuthentication}
                roleHook={setRole}
              />
            }
          />
          {authenticated && <Route path="landing" element={<LandingPage role={role} authenticateHook={setAuthentication} />} />}
          {(role === 'partpicker' || role === 'technician') && <Route path="jobs" element={<Jobs jobHook={setJob} />} />}
          {(role === 'partpicker' || role === 'technician') && <Route path="individualjob" element={<IndividualJob job={currJob} />} />}
          <Route path="cashier" element={<CashierInterface />} />
          <Route path="timesheet" element={authenticated ? <TimesheetPage /> : <Navigate to="/login" />} />
          <Route path="jobs" element={authenticated ? <JobsPage /> : <Navigate to="/login" />} />
          <Route path="timesheet_manage" element={authenticated ? <TimesheetManage /> : <Navigate to="/login" />} />
          <Route path="jobs_manage" element={authenticated ? <JobsManage /> : <Navigate to="/login" />} />
          <Route path="inventory_manage" element={authenticated ? <InventoryManage /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
