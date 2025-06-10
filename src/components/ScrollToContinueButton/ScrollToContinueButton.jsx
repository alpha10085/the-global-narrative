"use client";
import { scrollByVh } from "@/utils/document";
import styles from "./ScrollToContinueButton.module.css";
const ScrollToContinueButton = ({
  scrollValue = "90vh"
}) => {
  return (
    <div
      onClick={() => scrollByVh(scrollValue)}
      className={`${styles.scrollBox} flex-c column`}
    >
      <div className={`${styles.line} flex-c `}>
        <div className={`${styles.progress}`}></div>
      </div>
      <h1 className={styles.label}>scroll to continue</h1>
    </div>
  );
};

export default ScrollToContinueButton;
