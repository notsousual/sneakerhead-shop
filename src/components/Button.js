import React from "react";
import "./Button.scss";

const Button = ({
  type = "default",
  size = "big",
  text,
  icon,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`btn btn--${type} btn--${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={`btn__icon btn__icon--${size}`}>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
