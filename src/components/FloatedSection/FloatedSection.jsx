"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children }) => {
  const sectionRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!sectionRef.current) return;

  //     window.requestAnimationFrame(() => {
  //       const el = sectionRef.current;
  //       const rect = el.getBoundingClientRect();
  //       const windowHeight = window.innerHeight;

  //       const start = windowHeight * 1.5;
  //       const end = windowHeight * 0.1;

  //       const rawProgress = (start - rect.top) / (start - end);
  //       const clamped = Math.min(1, Math.max(0, rawProgress));

  //       el.style.marginTop = `-${clamped * 300}px`;
  //     });
  //   };

  //   handleScroll();

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <section ref={sectionRef} className={styles.floated}>
      {children}
    </section>
  );
};

export default FloatedSection;
