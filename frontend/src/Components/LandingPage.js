import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";
import "./LandingPage.css";
import Cookies from "js-cookie";

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
  const [userJobs, setUserJobs] = useState([]);
  const [userTimesheets, setUserTimesheets] = useState([]);

  const handleLogout = () => {
    props.authenticateHook(false);
    Cookies.remove("token");
    Cookies.remove("userInfo");
    fetch("http://localhost:8000/logout", { method: "POST" });
    navigate("/home");
  };

  useEffect(() => {
    const userDataString = Cookies.get("userInfo");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const encodedEmail = encodeURIComponent(userData.email);

      fetch(`http://localhost:8000/api/user_data/${encodedEmail}`, {
        method: "GET",
        credentials: "include", // Correct
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("User Data from API:", data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

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
