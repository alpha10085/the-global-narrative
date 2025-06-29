"use client";
import { useEffect, useRef } from "react";
import styles from "./FloatedSection.module.css";

const FloatedSection = ({ children, className = "" }) => {
  const sectionRef = useRef(null);
  const ticking = useRef(false);
  const isVisible = useRef(false);

  // Cached measurements
  const elementBottomRef = useRef(0);
  const elementHeightRef = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const updateMeasurements = () => {
      const rect = el.getBoundingClientRect();
      // element's bottom position relative to the document (viewport top + scrollY)
      elementBottomRef.current = rect.bottom + window.scrollY;
      elementHeightRef.current = rect.height;
    };

    const update = () => {
      if (!isVisible.current) return;

      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;

      // Calculate progress based on scroll and cached element bottom position
      // Start point: scroll position at which animation begins
      const start = elementBottomRef.current - windowHeight;
      // End point: scroll position at which animation ends (10% viewport height above start)
      const end = start + windowHeight * 0.9;

      // Calculate progress clamped between 0 and 1
      const rawProgress = (scrollY - start) / (end - start);
      const clamped = Math.min(1, Math.max(0, rawProgress));

      sectionRef.current.style.transform = `translate3d(0px, ${clamped * (windowHeight / 3)}px, 0)`;
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
          sectionRef.current.style.transform = ""; // reset transform when not visible
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
