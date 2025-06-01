"use client";
import { useEffect, useRef } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children }) => {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const el = sectionRef.current;
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          const start = windowHeight * 1.5;
          const end = windowHeight * 0.1;

          const rawProgress = (start - rect.top) / (start - end);
          const clamped = Math.min(1, Math.max(0, rawProgress));
          progressRef.current = clamped;

          // Apply transform directly (better performance)
          el.style.transform = `translateY(-${clamped * 300}px)`;

          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    // Initial call in case section is already in viewport on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.floated}>
      {children}
    </section>
  );
};

export default FloatedSection;
