"use client"
import { motion } from "framer-motion";
import styles from "./SmoothTextRise.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const wordVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const SmoothTextRise = ({ delay = 1000, text = "" }) => {
  const words = text.split(" ");

  return (
    <div className={styles.container}>
      <motion.p
        className={styles.text}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{
          delayChildren: delay / 1000, // convert ms to seconds
          staggerChildren: 0.015,       // adjust word delay
        }}
      >
        {words.map((word, index) => (
          <motion.span key={index} className={styles.word} variants={wordVariants}>
            {word}{" "}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export default SmoothTextRise;
