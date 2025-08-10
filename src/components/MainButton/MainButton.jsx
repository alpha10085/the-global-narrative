"use client"
import styles from "./MainButton.module.css";

import LinkTransition from "../Shared/LinkTransition/LinkTransition";
import { ArrowDownwardIcon } from "../Home/icons";
import { scrollByVh } from "@/utils/document";
const MainButton = ({ text = "", href = "/", className = "" }) => {
  return (
    <div
    onClick={() => {
      scrollByVh("92vh")
    }}
     
      className={`flex gap5 al-i-c ${styles.toggleButton} ${className}`}
    >
      <span className={`${styles.contnet} flex al-i-c`}>{text}</span>

      <span className={`flex-c ${styles.arrow}`}>
        <ArrowDownwardIcon />
      </span>
    </div>
  );
};

export default MainButton;
