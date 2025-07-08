"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import styles from "./AnimatedParagraph.module.css";

const AnimatedParagraph = ({
  options = {},
  className = "",
  classNameLine="",
  text = "",
  delayPerWord = 0.1,
  duration = 0.5,
  gap = 20,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Split by period, but preserve the period at the end of each line
  const lines = text
    ?.split(/(?<=\.)\s+/) // split by ". " and keep the period
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  let wordCountBefore = 0;

  return (
    <div
      {...options}
      ref={ref}
      className={className}
      style={{ display: "flex", flexDirection: "column", gap }}
    >
      {lines?.map((line, lineIndex) => {
        const words = line.split(" ");
        const lineStartDelay = wordCountBefore * delayPerWord;
        wordCountBefore += words.length;

        return (
          <div
          className={` ${classNameLine}`}
          key={lineIndex} >
            {words.map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                className={styles.word}
                initial={{ opacity: 0.2 }}
                animate={inView ? { opacity: 1 } : { opacity: 0.2 }}
                transition={{
                  delay: lineStartDelay + wordIndex * delayPerWord,
                  duration,
                }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedParagraph;
