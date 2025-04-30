"use client";
import styles from "./Hero.module.css";
import { useState, useEffect } from "react";
const ShadowEffect = () => {
  const [scrollValue, setScrollValue] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      if (scrollY <= windowHeight) {
        // Map scrollY from 0 to windowHeight into a range of 0 to 100
        const mappedValue = Math.round((scrollY / windowHeight) * 100);
        setScrollValue(mappedValue);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      style={{
        opacity: scrollValue / 40,
      }}
      className={styles.darkShadowEffect}
    />
  );
};

export default ShadowEffect;
