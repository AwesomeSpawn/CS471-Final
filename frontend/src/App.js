import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import LandingPage from "./Components/LandingPage";
import TimesheetPage from "./Components/TimesheetPage";
import JobsPage from "./Components/JobsPage";
import TimesheetManage from "./Components/TimesheetManage";
import JobsManage from "./Components/JobsManage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");
    if (isAuthenticated) {
      setAuthenticated(true);
    }

    const userRole = localStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    }
  }, []);

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
                authenticateHook={setAuthenticated}
                roleHook={setRole}
              />
            }
          />
          <Route
            path="landing"
            element={
              authenticated ? (
                <LandingPage role={role} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="timesheet"
            element={
              authenticated ? <TimesheetPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="jobs"
            element={authenticated ? <JobsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="timesheet-manage"
            element={
              authenticated ? <TimesheetManage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="jobs-manage"
            element={authenticated ? <JobsManage /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
