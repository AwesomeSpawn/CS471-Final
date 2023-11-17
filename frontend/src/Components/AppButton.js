import React from "react";
import { useNavigate } from "react-router-dom";



function AppButton(props){
    const nav = useNavigate();
    return(<div>
        <button className="appColumn" onClick={nav('/' + props.route)}>
            <image src={props.source}>
            </image>
        </button>
    </div>)

}

export default AppButton