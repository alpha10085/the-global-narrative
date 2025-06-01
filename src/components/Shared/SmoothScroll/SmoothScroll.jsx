"use client";
import { delay } from "@/utils/delay";
import eventBus from "@/utils/eventBus";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SmoothScroll = ({ duration = 0.9 }) => {
  const [enable, setEnable] = useState(true);
  const pathname = usePathname();
  const startLenis = () => setEnable(true);
  const stopLenis = () => {
    setEnable(false);
  };
  useEffect(() => {
    const handler = async (newval) => {
      await delay(105);
      if (newval) {
        startLenis();
      } else {
        stopLenis();
      }
    };

    eventBus.on("lenis", handler);

    return () => {
      eventBus.off("lenis", handler); // cleanup
    };
  }, []);

  return enable ? <LenisComponent duration={duration} /> : null;
};

export default SmoothScroll;

const LenisComponent = ({ duration }) => {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration,
      smooth: true,
      gestureDirection: "vertical",
      mouseMultiplier: 1,
      smoothTouch: false,
    });
    lenisRef.current = lenis;

    const update = (time) => {
      lenis.raf(time);
      requestAnimationFrame(update);
    };

    const animationFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, [duration]);

  // 👇 Scroll to top when pathname changes
  useEffect(() => {
    if (lenisRef.current) {
      // Use a small delay to ensure DOM has mounted the new page
      setTimeout(() => {
        lenisRef.current.scrollTo(-100, { immediate: true }); // or `{ offset: 0, immediate: true }`
      }, 100);
    }
  }, [pathname]);

  return null;
};
