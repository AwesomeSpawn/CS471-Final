import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";
import './LandingPage.css'
import { useState } from "react";
import Cookies from "js-cookie";

let technician_apps = ['jobs', 'timesheet'];
let manager_apps = ['jobs_manage', 'timesheet', 'timesheet_manage'];
let cashier_apps = ['timesheet']
let employee_apps = ['timesheet']

function LandingPage(props) {
    let apps = [];
    const nav = useNavigate();
    if (props.role === 'technician') apps = technician_apps;
    else if (props.role === 'manager') apps = manager_apps;
    else if (props.role === 'cashier') apps = cashier_apps;
    else apps = employee_apps;
    console.log(props.role);
    return(
        <div>
            <button onClick={() => {
                props.authenticateHook(false);
                Cookies.remove('token');
                axios.post('http://LocalHost:8000/logout');
                nav('home');
            }}>Logout</button>
            <h1>Landing Page</h1>
            <div className="MyWrap">
                {apps.map((appName) => 
                    <AppButton source={appName} route={appName} />
                )}
            </div>
        </div>
    )

}

export default LandingPage;