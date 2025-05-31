"use client";
// AnimatedBorderSection.jsx
import React, { useRef, useEffect, useState } from "react";
import styles from "./AnimatedBorderSection.module.css";

const AnimatedBorderSection = ({ children }) => {
  const ref = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.unobserve(entry.target); // Stop observing once triggered
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  return (
    <div
      ref={ref}
      className={`${styles.section} ${hasAnimated ? styles.animate : ""}`}
    >
      <div className={styles.borderPink}></div>
      <div className={styles.borderDarkBlue}></div>
      <div className={styles.borderwhite}></div>
      <div className={styles.borderBlue}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default AnimatedBorderSection;
