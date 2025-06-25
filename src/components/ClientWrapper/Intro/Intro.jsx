"use client";

import { useEffect, useState } from "react";
import styles from "./Intro.module.css";

const Intro = () => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(true);
    }, 700); // start animation after short delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.intro}>
      <div className={styles.logoContainer}>
        <span className={`${styles.g} ${start ? styles.slide : ""}`}>G</span>
        <span className={`${styles.text} ${start ? styles.showText : ""}`}>
          <p>lobal</p>
          <p>Narrative</p>
          <p>PR with purpose</p>
        </span>
      </div>
    </div>
  );
};

export default Intro;
