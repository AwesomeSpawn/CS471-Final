import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";
import "./LandingPage.css";
import Cookies from "js-cookie";
import axios from "axios";

const employee_apps = ["jobs", "timesheet", "jobs_manage", "timesheet_manage"];
const technician_apps = ["jobs", "timesheet"];
const manager_apps = ["jobs_manage", "timesheet", "timesheet_manage"];
const cashier_apps = ["timesheet"];

function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function LandingPage(props) {
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    props.authenticateHook(false);
    Cookies.remove("token");
    Cookies.remove("userInfo"); // Ensure to remove userInfo cookie on logout
    axios.post("http://LocalHost:8000/logout");
    navigate("/home");
  };

  // Fetch the user data from cookies and console log it
  useEffect(() => {
    const userDataString = Cookies.get("userInfo");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log("User Data from Cookies:", userData);
    } else {
      console.log("No user data found in cookies.");
    }
  }, []);

  // Determine which apps to show based on user role
  let apps = [];
  switch (props.role) {
    case "technician":
      apps = technician_apps;
      break;
    case "manager":
      apps = manager_apps;
      break;
    case "cashier":
      apps = cashier_apps;
      break;
    default:
      apps = employee_apps;
  }

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
