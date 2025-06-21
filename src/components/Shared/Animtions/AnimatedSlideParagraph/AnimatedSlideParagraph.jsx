"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import styles from "./AnimatedSlideParagraph.module.css";

const AnimatedSlideParagraph = ({
  options = {},
  className = "",
  text = "",
  delay = 0.2,
  duration = 0.6,
  gap = 12,
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
  });

  const lines = text
    ?.split(/(?<=\.)\s+/) // keep period
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return (
    <div
      {...options}
      ref={ref}
      className={`${styles.container} ${
        inView ? styles.show : ""
      } ${className}`}
      style={{ gap }}
    >
      {lines?.map((line, i) => (
        <div
          key={i}
          className={styles.line}
          style={{
            animationDelay: `${i * (delay + 0.15)}s`,
            animationDuration: `${duration}s`,
          }}
        >
          <p>{line}</p>
        </div>
      ))}
    </div>
  );
};

export default AnimatedSlideParagraph;
