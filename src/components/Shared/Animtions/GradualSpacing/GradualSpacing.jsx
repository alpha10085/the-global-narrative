"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import styles from "./GradualSpacing.module.css"; // Import the CSS module

const GradualSpacing = ({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
}) => {
  const { ref, inView } = useInView({
    // triggerOnce: true, // Trigger animation only once
    threshold: 0.1, // Trigger when 10% of the component is visible
  });

  return (
    <div ref={ref} className={styles.container}>
      <AnimatePresence>
        {text?.split("").map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            animate={inView ? "visible" : "hidden"} // Animate only if in view
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
            className={`${styles.character} ${className || ""}`}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GradualSpacing;
