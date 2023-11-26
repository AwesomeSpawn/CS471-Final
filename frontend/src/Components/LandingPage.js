// Remove unused imports
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";
import "./LandingPage.css";

let technician_apps = ["jobs", "timesheet"];
let manager_apps = ["jobs_manage", "timesheet", "timesheet_manage"];
let cashier_apps = ["timesheet"];
let employee_apps = ["timesheet"];

function LandingPage(props) {
  let apps = [];
  if (props.role === "technician") apps = technician_apps;
  else if (props.role === "manager") apps = manager_apps;
  else if (props.role === "cashier") apps = cashier_apps;
  else apps = employee_apps;

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="landingPageContainer">
      <header>
        <h1>Welcome to the Dashboard</h1>
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
