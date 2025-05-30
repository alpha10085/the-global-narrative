"use client";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import styles from "./StaticSection.module.css";
const StaticSection = ({ children }) => {
  const { isInside, sectionRef } = useSectionObserver({
    threshold: 0.2,
  });
  return (
    <div className={styles.staticContainer} ref={sectionRef}>
      {children}
    </div>
  );
};

export default StaticSection;
