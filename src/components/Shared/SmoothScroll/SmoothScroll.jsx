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
      await delay(155);
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

  useEffect(() => {
  
    stopLenis();
    delay(150).then(() => {
      window.scrollTo(0, 0);
      startLenis();
    });
  }, [pathname]);

  return enable ? <LenisComponent duration={duration} /> : null;
};

export default SmoothScroll;

const LenisComponent = ({ duration }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration });
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
  }, []);

  return null;
};
