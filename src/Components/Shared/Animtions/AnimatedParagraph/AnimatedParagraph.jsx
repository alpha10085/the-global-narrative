"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import styles from "./AnimatedParagraph.module.css";

const AnimatedParagraph = ({
  options={},
  className = "",
  text = "",
  delayPerWord = 0.1, // <== New prop
  duration = 0.5,      // Optional, if you want to control speed
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const words = text?.split(" ");

  return (
    <p
    {...options}
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={styles.word}
          initial={{ opacity: 0.2 }}
          animate={inView ? { opacity: 1 } : { opacity: 0.2 }}
          transition={{
            delay: i * delayPerWord, // 👈 Control delay here
            duration: duration,
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </p>
  );
};

export default AnimatedParagraph;
