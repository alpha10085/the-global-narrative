"use client";
import { delay } from "@/utils/delay";
import eventBus from "@/utils/eventBus";
import Lenis from "lenis";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const SmoothScroll = ({ duration = 1.2, lerp = 0.1, smooth = true }) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);
  const pathname = usePathname();

  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    const lenis = new Lenis({
      duration,
      prevent: (node) => node.id === "modal",
      smoothWheel: true,
      smoothTouch: isTouchDevice(), // Enable smoothTouch if it's a mobile/touch device
      direction: "vertical",
      wheelMultiplier: 0.7,
      lerp,
    });

    lenisRef.current = lenis;

    lenis.scrollTo(window.scrollY || 0, { immediate: true });

    const update = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [duration, lerp, smooth]);

  useEffect(() => {
    const handler = async (newval) => {
      await delay(105);
      if (newval) {
        lenisRef.current?.start();
      } else {
        lenisRef.current?.stop();
      }
    };

    eventBus.on("lenis", handler);

    return () => {
      eventBus.off("lenis", handler);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      lenisRef.current?.scrollTo(0, { immediate: true });
    }, 100);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default SmoothScroll;
