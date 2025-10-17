import React from "react";
import "./Background.css";
import backgroundImage from "../../../public/assets/background.png";


export default function Background() {
  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    ></div>

  );
}
