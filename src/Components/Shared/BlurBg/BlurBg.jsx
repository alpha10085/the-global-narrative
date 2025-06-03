"use client";
import styles from "./BlurBg.module.css";
const BlurBg = ({ onClick = () => {}, className = "", theme = "light" }) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.bgblur} ${
        theme === "dark" ? styles.dark : ""
      } ${className} `}
    />
  );
};

export default BlurBg;
