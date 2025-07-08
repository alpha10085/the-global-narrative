"use client";
import { useEffect, useRef } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children, className = "" }) => {
  const sectionRef = useRef(null);
  const ticking = useRef(false);
  const isVisible = useRef(false);
  const measurements = useRef({ bottom: 0, height: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.innerWidth < 768) return;

    const updateMeasurements = () => {
      const rect = el.getBoundingClientRect();
      measurements.current.bottom = rect.bottom + window.scrollY;
      measurements.current.height = rect.height;
    };

    const update = () => {
      if (!isVisible.current || !el) return;

      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const start = measurements.current.bottom - windowHeight;
      const end = start + windowHeight * 0.9;

      const rawProgress = (scrollY - start) / (end - start);
      const clamped = Math.min(1, Math.max(0, rawProgress));

      el.style.transform = `translate3d(0, ${clamped * (windowHeight / 3)}px, 0)`;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    const onResize = () => {
      updateMeasurements();
      update();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          updateMeasurements();
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onResize);
          update();
        } else {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
          if (el) el.style.transform = "";
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.floated} ${className}`}>
      {children}
    </section>
  );
};

export default FloatedSection;
