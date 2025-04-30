import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./AnimatedCheckbox.module.css";

const AnimatedCheckbox = ({
  className = "",
  boxColor = "white",
  checkColor = "black",
  label = "",
  label_className = "",
  onChange = () => {},
  wrapper_className = "",
  defaultValue = false,
}) => {
  const [checked, setChecked] = useState(!!defaultValue);

  return (
    <div
      className={`${styles.container} ${wrapper_className}`}
      onClick={() => {
        onChange(!checked);
        setChecked(!checked);
      }}
    >
      <motion.div
        className={`${styles.checkbox} ${className}`}
        style={{
          borderColor: boxColor,
          backgroundColor: checked ? boxColor : "transparent",
        }}
        animate={{ scale: checked ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {checked && (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={checkColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M5 12l5 5L19 7" />
          </motion.svg>
        )}
      </motion.div>
      <span className={`${styles.label} ${label_className}`}>{label}</span>
    </div>
  );
};

export default AnimatedCheckbox;
