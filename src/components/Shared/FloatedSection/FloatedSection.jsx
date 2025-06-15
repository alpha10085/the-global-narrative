"use client";
import { useEffect, useRef } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children, className = "" }) => {
  const sectionRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const start = windowHeight;
        const end = windowHeight * 0.1;

        let rawProgress = (start - rect.bottom) / (start - end);
        const clamped = Math.min(1, Math.max(0, rawProgress));

        el.style.transform = `translate3d(0px, ${clamped * 300}px, 0)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll); // re-trigger on resize
    handleScroll(); // initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);


  return children
  return (
    <section ref={sectionRef} className={`${styles.floated} ${className}`}>
      {children}
    </section>
  );
};

export default FloatedSection;
