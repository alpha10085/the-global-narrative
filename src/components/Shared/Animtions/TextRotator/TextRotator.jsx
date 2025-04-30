"use client";
import React, { useState, useEffect } from "react";
import styles from "./TextRotator.module.css";

const TextRotator = ({ texts, interval = 3000, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState(styles.fadeInUp);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimation(styles.fadeOutDown); // Start fade-out animation
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length); // Switch text
        setAnimation(styles.fadeInUp); // Start fade-in animation
      }, 500); // Sync with CSS animation duration
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <div className={`${styles.textRotator} ${className}`}>
      <h1 className={animation}>{texts[currentIndex]}</h1>
    </div>
  );
};

export default TextRotator;
