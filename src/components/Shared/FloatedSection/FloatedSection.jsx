"use client";
import { useEffect, useRef } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children, className = "" }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
        } else {
          el.classList.remove(styles.visible);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.floated} ${className}`}>
      {children}
    </section>
  );
};

export default FloatedSection;
