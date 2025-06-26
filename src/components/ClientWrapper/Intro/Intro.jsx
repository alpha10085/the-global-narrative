"use client";

import { useEffect, useState } from "react";
import styles from "./Intro.module.css";
import MainLogo from "@/components/MainLogo/MainLogo";

const Intro = ({ hide = false, onHideEnd }) => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(true);
    }, 1500); // Delay before logo animates to corner

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.intro} ${hide ? styles.hide : ""}`}
      onAnimationEnd={hide ? onHideEnd : undefined}
    >
      <div
        className={`${styles.animatedLogo} ${
          start ? styles.logoToCorner : ""
        }`}
      >
        <MainLogo theme="dark" />
      </div>
    </div>
  );
};

export default Intro;
