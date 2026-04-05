import React from "react";
import Styles from "./Button.module.css";

const Button = ({ children, buttonType = 'success', handleButton, shadow = false, type = "button"}) => {
  return (
    <div>
      <button
        type={type}
        className={`${Styles[buttonType]} ${Styles.btn} ${shadow && Styles.shadow}`}
        onClick={handleButton}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
