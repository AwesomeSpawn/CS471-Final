import React from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";
import "./LandingPage.css";
import Cookies from "js-cookie";
import axios from "axios";

let employee_apps = ["jobs", "timesheet", "jobs_manage", "timesheet_manage"];
let technician_apps = ["jobs", "timesheet"];
let manager_apps = ["jobs_manage", "timesheet", "timesheet_manage"];
let cashier_apps = ["timesheet"];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function LandingPage(props) {
  const navigate = useNavigate();
  let apps = [];

  if (props.role === "technician") apps = technician_apps;
  else if (props.role === "manager") apps = manager_apps;
  else if (props.role === "cashier") apps = cashier_apps;
  else apps = employee_apps;

  const handleLogout = () => {
    props.authenticateHook(false);
    Cookies.remove("token");
    axios.post("http://LocalHost:8000/logout");
    navigate("/home");
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
