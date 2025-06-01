"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children }) => {
  const sectionRef = useRef(null);
  const [heightStyle, setHeightStyle] = useState({});

  useEffect(() => {
    if (!sectionRef.current) return;

    // Measure the section height
    const height = sectionRef.current.offsetHeight;

    // Subtract 300px for the transform offset
    setHeightStyle({ height: `${height - 300}px` });

  }, [children]); // run on mount and when children change (optional)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      window.requestAnimationFrame(() => {
        const el = sectionRef.current;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const start = windowHeight * 1.5;
        const end = windowHeight * 0.1;

        const rawProgress = (start - rect.top) / (start - end);
        const clamped = Math.min(1, Math.max(0, rawProgress));

        el.style.transform = `translateY(-${clamped * 300}px)`;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={heightStyle}
      className={styles.floated}
    >
      {children}
    </section>
  );
};

export default FloatedSection;
