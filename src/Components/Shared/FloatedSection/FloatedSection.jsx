"use client";
import { useEffect, useRef } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const el = sectionRef.current;
    const windowHeight = window.innerHeight;

    // We'll observe the element with multiple thresholds for smooth progress
    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100); // 0 to 1 in 0.01 steps

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Calculate progress similar to your original logic:
        // When bottom of the element moves from windowHeight (start) to windowHeight*0.1 (end)

        const bottom = entry.boundingClientRect.bottom;
        const start = windowHeight;
        const end = windowHeight * 0.1;

        let rawProgress = (start - bottom) / (start - end);
        const clamped = Math.min(1, Math.max(0, rawProgress));
        console.log("🚀 ~ useEffect ~ clamped:", clamped)

        // Apply transform based on progress
        el.style.transform = `translate3d(0px, ${clamped * 300}px , 0)`;
      },
      {
        root: null, // viewport
        threshold: thresholds,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.floated}>
      {children}
    </section>
  );
};

export default FloatedSection;
