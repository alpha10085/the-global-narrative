"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./WordFadeIn.module.css"; // Make sure this path is correct
import { useState, useEffect } from "react";
import { delay as delayFn } from "@/utils/delay";

const WordFadeIn = ({
  text = "",
  duration = 0.15,
  delay = 0,
  variants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * duration },
    }),
  },
  className = "", // Default to an empty string
  triggerOnce = true,
  threshold = 0.1,
  mode = "light",
  children,
}) => {
  const [event, setEvent] = useState(false);
  const [visibleChild, setVisibleChild] = useState(false);
  const words = text.split(" ");
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
    onChange: async (inView) => {
      if (inView) {
        await delayFn(delay);
        setEvent(true);
        await delayFn(words.length * (duration + 0.1) * 1000);
        setVisibleChild(true);
      } else {
        setVisibleChild(false);
        setEvent(false);
      }
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={event ? "visible" : "hidden"}
        className={`${styles.container} ${className}`} // Ensure className is applied here
      >
        <motion.h1
          variants={variants}
          initial="hidden"
          animate={event ? "visible" : "hidden"}
          className={`${styles.word} ${className}`} // Ensure className is applied here
        >
          {words.map((word, i) => (
            <motion.span
              key={`word1-${i}`}
              variants={variants}
              custom={i}
              className={mode === "light" ? styles.darkMode : styles.blackText}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={visibleChild ? "visible" : "hidden"}
        className={`${styles.word} ${className}`} // Ensure className is applied here
      >
        {children}
      </motion.div>
    </>
  );
};

export default WordFadeIn;
