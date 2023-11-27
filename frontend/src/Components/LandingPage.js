import React from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";
import "./LandingPage.css";
import "./LandingPage.css";
import Cookies from "js-cookie";

let employee_apps = ["jobs", "timesheet", "jobs_manage", "timesheet_manage"];
let technician_apps = ["jobs", "timesheet"];
let manager_apps = ["jobs_manage", "timesheet", "timesheet_manage"];
let cashier_apps = ["timesheet"];
// let employee_apps = ["timesheet"];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function LandingPage(props) {
  const apps = [];
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="landingPageContainer">
      <header>
        <h1>Welcome to the {capitalizeFirstLetter(props.role)} Dashboard</h1>
        <button onClick={handleLogout} className="logoutButton">
          Logout
        </button>
      </header>
      <div className="appWrapper">
        {apps.map((appName, index) => (
          <AppButton key={index} source={appName} route={appName} />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
