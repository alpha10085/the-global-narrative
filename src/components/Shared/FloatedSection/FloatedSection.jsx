"use client";
import { useEffect, useRef, useCallback } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children, className = "" }) => {
  const sectionRef = useRef(null);
  const windowHeightRef = useRef(0);
  const animationFrameRef = useRef(null);

  const updateTransform = useCallback((entry) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const el = sectionRef.current;
      if (!el || !windowHeightRef.current) return;

      const bottom = entry.boundingClientRect.bottom;
      const start = windowHeightRef.current;
      const end = start * 0.1;

      const rawProgress = (start - bottom) / (start - end);
      const clamped = Math.min(1, Math.max(0, rawProgress));

      el.style.transform = `translate3d(0px, ${clamped * 300}px , 0)`;
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    windowHeightRef.current = window.innerHeight;

    const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);

    const observer = new IntersectionObserver(
      ([entry]) => updateTransform(entry),
      {
        root: null,
        threshold: thresholds,
      }
    );

    observer.observe(el);

    const handleResize = () => {
      windowHeightRef.current = window.innerHeight;
      observer.disconnect();
      observer.observe(el);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateTransform]);

  return (
    <section ref={sectionRef} className={`${styles.floated} ${className}`}>
      {children}
    </section>
  );
};

export default FloatedSection;
