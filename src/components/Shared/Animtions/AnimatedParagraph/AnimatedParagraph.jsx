"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import styles from "./AnimatedParagraph.module.css";

const AnimatedParagraph = ({
  options = {},
  className = "",
  text = "",
  delayPerWord = 0.1,
  duration = 0.5,
  gap = 20,
  animationMode = "fade", // "fade" or "slideUp"
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Split text into lines based on periods, preserving them
  const lines = text
    ?.split(/(?<=\.)\s+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  let wordCountBefore = 0;

  const getAnimation = (mode, inView, delay) => {
    switch (mode) {
      case "slideUp":
        return {
          initial: { opacity: 0, transform: "translateY(20px)" },
          animate: inView
            ? { opacity: 1, transform: "translateY(0px)" }
            : { opacity: 0, transform: "translateY(20px)" },
          transition: { delay, duration, ease: "easeOut" },
        };
      case "fade":
      default:
        return {
          initial: { opacity: 0.2 },
          animate: inView ? { opacity: 1 } : { opacity: 0.2 },
          transition: { delay, duration },
        };
    }
  };

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
          <div key={lineIndex} style={{ display: "flex", flexWrap: "wrap" }}>
            {words.map((word, wordIndex) => {
              const delay = lineStartDelay + wordIndex * delayPerWord;
              const { initial, animate, transition } = getAnimation(
                animationMode,
                inView,
                delay
              );

              return (
                <motion.span
                  key={wordIndex}
                  className={styles.word}
                  initial={initial}
                  animate={animate}
                  transition={transition}
                >
                  {word}&nbsp;
                </motion.span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedParagraph;
