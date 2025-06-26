"use client";
import { useEffect, useRef } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children, className = "" }) => {
  const sectionRef = useRef(null);
  const ticking = useRef(false);
  const lastTransform = useRef(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const update = () => {
      if (!isVisible.current) {
        ticking.current = false;
        return;
      }

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight;
      const end = windowHeight * 0.1;

      const rawProgress = (start - rect.bottom) / (start - end);
      const clamped = Math.min(1, Math.max(0, rawProgress));

      const y = clamped * (windowHeight / 3);
      const transform = `translate3d(0px, ${y.toFixed(2)}px, 0)`;

      // Only update if the value actually changed to avoid layout recalculation
      if (transform !== lastTransform.current) {
        el.style.transform = transform;
        lastTransform.current = transform;
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          update(); // trigger once on mount
        } else {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
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
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.floated} ${className}`}>
      {children}
    </section>
  );
};

export default FloatedSection;
