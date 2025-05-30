"use client";
import { useEffect, useRef, useState } from "react";
export function useSectionObserver({ threshold = 0.5 }) {
  const sectionRef = useRef();
  const [isInside, setisInside] = useState(false);
  useEffect(() => {
    if (!sectionRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setisInside(true);
        } else {
          setisInside(false);
        }
      },
      { threshold }
    );

    const element = sectionRef.current;
    observer.observe(element);

    return () => observer.unobserve(element);
  }, [sectionRef, threshold]);
  return {
    isInside,
    sectionRef,
  };
}
