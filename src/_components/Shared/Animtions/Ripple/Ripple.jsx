"use client";
import React, { useEffect, useState } from "react";
import styles from "./Ripple.module.css";

const Ripple = ({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  delay = 0,
}) => {
  const [circles, setCircles] = useState([]);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    const newCircles = Array.from({ length: numCircles }, (_, i) => ({
      size: mainCircleSize + i * 70,
      opacity: mainCircleOpacity - i * 0.03,
      animationDelay: `${i * 0.08}s`,
      borderStyle: i === numCircles - 1 ? "dashed" : "solid",
      borderOpacity: 5 + i * 5,
    }));
    setCircles(newCircles);
  }, [mainCircleSize, mainCircleOpacity, numCircles]);

  return (
    <div className={styles.rippleContainer}>
      {startAnimation &&
        circles?.map((circle, i) => (
          <div
            key={i}
            className={styles.circle}
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              opacity: startAnimation ? circle.opacity : 0,
              animationPlayState: startAnimation ? "running" : "paused", // Ensure animation only starts after delay
              animationDelay: startAnimation ? circle.animationDelay : "0s",
              borderStyle: circle.borderStyle,
              borderWidth: "1px",
              borderColor: `rgba(255, 255, 255, ${circle.borderOpacity / 100})`,
            }}
          />
        ))}
    </div>
  );
};

export default Ripple;
