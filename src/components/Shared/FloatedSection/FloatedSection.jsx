"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children, className = "" }) => {
  const sectionRef = useRef(null);
  const windowHeightRef = useRef(0); // Don't initialize with window.innerHeight

  const updateTransform = useCallback((entry) => {
    const el = sectionRef.current;
    if (!el || !windowHeightRef.current) return;

    const bottom = entry.boundingClientRect.bottom;
    const start = windowHeightRef.current;
    const end = start * 0.1;

    let rawProgress = (start - bottom) / (start - end);
    const clamped = Math.min(1, Math.max(0, rawProgress));

    el.style.transform = `translate3d(0px, ${clamped * 300}px , 0)`;
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const el = sectionRef.current;
    windowHeightRef.current = window.innerHeight; // Safe here

    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

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
    };
  }, [updateTransform]);

  return (
    <section ref={sectionRef} className={`${styles.floated} ${className}`}>
      {children}
    </section>
  );
};

export default FloatedSection;
