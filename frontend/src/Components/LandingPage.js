import React, { useEffect, useState } from "react";
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
  const [userRole, setUserRole] = useState("employee"); // Default role set to 'employee'

  // Function to handle user logout
  const handleLogout = () => {
    props.authenticateHook(false);
    Cookies.remove("token");
    Cookies.remove("userInfo"); 
    axios.post("/logout");
    navigate("/home");
  };

  useEffect(() => {
    const userDataString = Cookies.get("userInfo");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const encodedEmail = encodeURIComponent(userData.email);
      console.log("Decoded email:", decodeURIComponent(encodedEmail));
      console.log("User Data:", userData);

      axios
        .get(`/api/user_data/${encodedEmail}`)
        .then((response) => {
          console.log("User Data from API:", response.data);
          setUserRole(response.data.user_role); // Set the user role using state setter
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      // ... handle no user data ...
    }
  }, []);

  // Determine which apps to show based on user role
  let apps = [];
  switch (userRole) {
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
        <h1>Welcome to the {capitalizeFirstLetter(userRole)} Dashboard</h1>
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
