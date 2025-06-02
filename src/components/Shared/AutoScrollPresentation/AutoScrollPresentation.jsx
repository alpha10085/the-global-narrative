"use client";

import { delay as delayFN } from "@/utils/delay";
import { useEffect, useRef, useState } from "react";

/**
 * @typedef {Object} SectionConfig
 * @property {string} id - معرف القسم (section ID)
 * @property {number} delay - التأخير قبل التمرير للقسم
 * @property {number} speed - سرعة التمرير للقسم
 */

/**
 * @typedef {"linear" | "easeInQuad" | "easeOutQuad" | "easeInOutQuad" | 
 * "easeInCubic" | "easeOutCubic" | "easeInOutCubic" | 
 * "easeInQuart" | "easeOutQuart" | "easeInOutQuart" | 
 * "easeInQuint" | "easeOutQuint" | "easeInOutQuint" | 
 * "lenisSmooth"} EaseMode
 */

export default function AutoScrollPresentation({
  sections = [],
  easeMode = "lenisSmooth",
}) {
  const [scrolling, setScrolling] = useState(false);
  const currentIndex = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        setScrolling((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (!scrolling) {
      isScrolling.current = false;
      resetCursor();
      return;
    }

    isScrolling.current = true;
    currentIndex.current = 0;
    disableCursor();

    const easingFunctions = {
      linear: (t) => t,
      easeInQuad: (t) => t * t,
      easeOutQuad: (t) => 1 - (1 - t) * (1 - t),
      easeInOutQuad: (t) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      easeInCubic: (t) => t * t * t,
      easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
      easeInOutCubic: (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      easeInQuart: (t) => t * t * t * t,
      easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
      easeInOutQuart: (t) =>
        t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
      easeInQuint: (t) => t * t * t * t * t,
      easeOutQuint: (t) => 1 - Math.pow(1 - t, 5),
      easeInOutQuint: (t) =>
        t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
      lenisSmooth: (t) => {
        const x = 1 - Math.pow(1 - t, 3);
        return x * (1 - 0.2 * (1 - x));
      },
    };

    const easeFunction = easingFunctions[easeMode];

    const smoothScroll = (targetPosition, duration) => {
      return new Promise((resolve) => {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animateScroll = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const easedProgress = easeFunction(progress);

          window.scrollTo(0, startPosition + distance * easedProgress);

          if (progress < 1 && isScrolling.current) {
            requestAnimationFrame(animateScroll);
          } else {
            resolve();
          }
        };

        requestAnimationFrame(animateScroll);
      });
    };

    const scrollToNext = async () => {
      if (sections.length === 0) return;

      while (isScrolling.current && currentIndex.current < sections.length) {
        const { id, delay, speed } = sections[currentIndex.current];
        const targetElement = document.getElementById(id);

        if (!targetElement) {
          currentIndex.current++;
          continue;
        }

        const targetPosition = targetElement.offsetTop - 100;

        await smoothScroll(targetPosition, speed * 500);
        await delayFN(delay);

        currentIndex.current++;
      }

      setScrolling(false);
    };

    scrollToNext();

    return resetCursor;
  }, [scrolling, easeMode, sections]);

  const disableCursor = () => {
    document.body.style.cursor = "none";
    document.body.style.pointerEvents = "none";
    document.documentElement.style.setProperty("cursor", "none", "important");
  };

  const resetCursor = () => {
    isScrolling.current = false;
    document.body.style.cursor = "auto";
    document.body.style.pointerEvents = "auto";
    document.documentElement.style.setProperty("cursor", "auto", "important");
  };

  return null;
}
