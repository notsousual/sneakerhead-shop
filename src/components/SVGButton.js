import React from "react";
import "./SVGButton.css";

const SvgButton = ({ IconComponent, onClick }) => {
  return (
    <button onClick={onClick} className="svg-button">
      <IconComponent aria-hidden="true" focusable="false" />
    </button>
  );
};

export default SvgButton;
