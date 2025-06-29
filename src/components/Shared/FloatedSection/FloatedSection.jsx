"use client";
import { useEffect, useRef } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children, className = "" }) => {
  const sectionRef = useRef(null);
  const ticking = useRef(false);
  const isVisible = useRef(false);
  const lastScrollTime = useRef(0);
  const throttleMs = 100; 

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const update = () => {
      if (!isVisible.current) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight;
      const end = windowHeight * 0.1;

      const rawProgress = (start - rect.bottom) / (start - end);
      const clamped = Math.min(1, Math.max(0, rawProgress));

      el.style.transform = `translate3d(0px, ${clamped * (windowHeight / 3)}px, 0)`;

      ticking.current = false;
    };

    const onScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime.current < throttleMs) return;

      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
        lastScrollTime.current = now;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          update(); // run once on intersect
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
