import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";
import './LandingPage.css'
import { useState } from "react";
import {jobs} from './images/jobs.png'

function LandingPage(props) {
    const apps = ['jobs']
    console.log(props.role);
    return(
        <div className="MyWrap">
            {apps.map((appName) => 
                <AppButton source={jobs} route={appName} />
            )}
        </div>
    )

}

export default LandingPage;