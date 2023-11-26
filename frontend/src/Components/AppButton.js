import React from "react";
import { useNavigate } from "react-router-dom";

function AppButton(props) {
  const nav = useNavigate();
  return (
    <div className="AppsButton">
      <button onClick={() => nav("/" + props.route)}>
        <img
          src={require("./images/" + props.source + ".png")}
          alt={props.source}
          height={200}
          width={200}
        />
      </button>
    </div>
  );
}

export default AppButton;
