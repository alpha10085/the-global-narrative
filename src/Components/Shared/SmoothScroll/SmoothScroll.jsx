"use client";
import useDynamicState from "@/hooks/useDynamicState";
import { delay } from "@/utils/delay";
import eventBus from "@/utils/eventBus";
import Lenis from "lenis";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SmoothScroll = ({ duration = 0.9 }) => {
  const [state, setState] = useDynamicState({
    enable: true,
  });
  const { enable } = state;
  const startLenis = () =>
    setState({
      enable: true,
    });
  const stopLenis = () => {
    setState({
      enable: false,
    });
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

const LenisComponent = ({ duration = 1.2, lerp = 0.1, smooth = true }) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  // Force browser repaint helper
  const forceRepaint = () => {
    document.body.style.display = "none";
    void document.body.offsetHeight; // trigger reflow
    document.body.style.display = "";
  };

  // Init Lenis ASAP but start RAF only after idle or delay
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration,
      prevent: (node) => node.id === "modal",
      smoothWheel: true,
      smoothTouch: false, // Disable on touch devices for better performance & UX
      direction: "vertical",
      wheelMultiplier: 0.7, // Adjust scroll sensitivity if needed
      lerp: 0.02, // control interpolation (0 to 1)
    });
    lenisRef.current = lenis;

    // Sync scroll position immediately
    lenis.scrollTo(window.scrollY || 0, { immediate: true });

    // Wait for idle time or 200ms delay before starting RAF loop
    const startAnimation = () => {
      forceRepaint(); // fix repaint glitches

      const update = (time) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(update);
      };
      rafRef.current = requestAnimationFrame(update);
      setReady(true);
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(startAnimation, { timeout: 200 });
    } else {
      const timer = setTimeout(startAnimation, 200);
      return () => clearTimeout(timer);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [duration, lerp, smooth]);

  // Scroll to top smoothly on route change
  useEffect(() => {
    if (!ready) return;

    const timeout = setTimeout(() => {
      lenisRef.current?.scrollTo(0, { immediate: true });
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname, ready]);

  return null;
};

export default SmoothScroll;
