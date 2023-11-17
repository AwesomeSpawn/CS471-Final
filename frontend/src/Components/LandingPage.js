import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";

function LandingPage(props) {
    let apps = [];
    if (props.role === "technician" || props.role === "partPicker" || props.role === "manager"){
        apps.push('Jobs');
    }
    return(
        <div>
            {apps.map((appName) => {
                <AppButton source={appName} route={appName} />
            })}
        </div>
    )

}

export default LandingPage;