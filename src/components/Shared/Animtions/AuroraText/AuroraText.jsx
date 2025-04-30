import React from "react";
import { motion } from "framer-motion";
import styles from "./AuroraText.module.css";

const AuroraText = ({ className = "", children, as: Component = "span", ...props }) => {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent className={`${styles.auroraText} ${className}`} {...props}>
      {children}
      <span className={styles.overlay}>
        <span className={`${styles.aurora} ${styles.aurora1}`}></span>
        <span className={`${styles.aurora} ${styles.aurora2}`}></span>
        <span className={`${styles.aurora} ${styles.aurora3}`}></span>
        <span className={`${styles.aurora} ${styles.aurora4}`}></span>
      </span>
    </MotionComponent>
  );
};

export default AuroraText;
