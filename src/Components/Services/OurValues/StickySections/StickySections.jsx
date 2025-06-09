"use client";
import { useEffect, useState } from "react";
import styles from "./StickySections.module.css";

const StickySections = ({ index = 0, children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-sticky-section]");
      const scrollY = window.scrollY;

      let newIndex = 0;
      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        const offsetTop = rect.top + scrollY - window.innerHeight / 2;

        if (scrollY + window.innerHeight / 2 >= offsetTop) {
          newIndex = i;
        }
      });

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  return (
    <div
      className={`${styles.section} flex al-i-c gap30 ${
        index === activeIndex || index === activeIndex + 1 ? styles.active : ""
      }`}
      data-sticky-section
      id={`sticky-section-${index}`}
    >
      {children}
    </div>
  );
};

export default StickySections;
