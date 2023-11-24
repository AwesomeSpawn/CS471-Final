import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";
import './LandingPage.css'
import { useState } from "react";

function LandingPage(props) {
    const apps = ['jobs', 'timesheet']
    console.log(props.role);
    return(
        <div>
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