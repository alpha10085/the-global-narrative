"use client";
import { useEffect, useRef } from "react";
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

  //       // Trigger when the bottom of the element appears
  //       const start = windowHeight; // Bottom of viewport
  //       const end = windowHeight * 0.1;

  //       const rawProgress = (start - rect.bottom) / (start - end);
  //       const clamped = Math.min(1, Math.max(0, rawProgress));

  //       el.style.transform = `translate3d(0px, ${clamped * 300}px , 0)`;
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
