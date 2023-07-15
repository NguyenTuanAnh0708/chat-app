import React from "react";
import "./CircleButton.scss";
const CircleButton = ({
  className,
  children,
  color = "#e4e6eb",
  handelClick,
}) => {
  return (
    <button
      onClick={handelClick}
      style={{ backgroundColor: color }}
      className={`CircleButton ${className ? className : ""}`}
    >
      {children}
    </button>
  );
};

export default CircleButton;
