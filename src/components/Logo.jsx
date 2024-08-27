import React from "react";
import logo from "../assets/Mainlogo2.jpg";

function Logo({ width = "100px", className = "" }) {
  return (
    <div>
      <img
        src={logo}
        alt="Logo"
        className={` h-[45px] w-[120px] rounded-lg ${className}`}
      />
    </div>
  );
}

export default Logo;
