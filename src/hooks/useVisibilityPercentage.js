"use client";
import { useState, useEffect, useRef } from "react";
const useVisibilityPercentage = ({ onChange = () => {} }) => {
  const [percentage, setPercentage] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visibleHeight = entry.intersectionRect.height;
        const totalHeight = entry.boundingClientRect.height;
        const visibility = (visibleHeight / totalHeight) * 100;
        const visibilityPercentage = Math.round(visibility);
        setPercentage(visibilityPercentage);
        onChange(visibilityPercentage);
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) } // 0% to 100% precision
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, percentage };
};

export default useVisibilityPercentage;
