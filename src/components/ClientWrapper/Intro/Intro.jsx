"use client";

import { useEffect, useState } from "react";
import styles from "./Intro.module.css";

const Intro = ({ hide = false, onHideEnd }) => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.intro} ${hide ? styles.hide : ""}`}
      onAnimationEnd={hide ? onHideEnd : undefined}
    >
      <div className={styles.logoContainer}>
        <div className={styles.mainTitle}>
          <span className={`${styles.g} ${start ? styles.slide : ""}`}>G</span>
          <div className={`${styles.text} ${start ? styles.showText : ""}`}>
            <div>lobal</div>
            <div>Narrative</div>
          </div>
        </div>

        <div className={`${styles.slogan} ${start ? styles.sloganAppear : ""}`}>
          PR with purpose
        </div>
      </div>
    </div>
  );
};

export default Intro;
