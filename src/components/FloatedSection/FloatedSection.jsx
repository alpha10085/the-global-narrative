"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children }) => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 → 1

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 1.5; // when animation starts
      const end = windowHeight * 0.1; // when it's fully translated

      const rawProgress = (start - rect.top) / (start - end);
      const clamped = Math.min(1, Math.max(0, rawProgress));

      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateY = progress * 300; // from 0 → 100px as user scrolls

  return (
    <section
      ref={sectionRef}
      className={styles.bottom}
      style={{
        transform: `translateY(${-translateY}px)`,
      }}
    >
      {children}
    </section>
  );
};

export default FloatedSection;
