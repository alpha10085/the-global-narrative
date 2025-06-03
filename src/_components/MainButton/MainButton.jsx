import React from "react";
import styles from "./MainButton.module.css";
const MainButton = ({text = "" , className = ""}) => {
  return (
    <button className={`flex gap5 al-i-c ${styles.toggleButton} ${className}`}>
      <span className={`${styles.contnet} flex al-i-c`}>
        {text}
      </span>
    </button>
  );
};

export default MainButton;
