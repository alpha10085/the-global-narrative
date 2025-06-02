"use client";
import useDynamicState from "@/hooks/useDynamicState";
import { delay } from "@/utils/delay";
import eventBus from "@/utils/eventBus";
import Lenis from "@studio-freight/lenis";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SmoothScroll = ({ duration = 0.9 }) => {
  const [state, setState] = useDynamicState({
    enable: true,
    mounted: false,
  });
  const { enable, mounted } = state;
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

    delay(300).then(() => setState({ mounted: true }));
    return () => {
      eventBus.off("lenis", handler); // cleanup
    };
  }, []);

  return mounted && enable ? <LenisComponent duration={duration} /> : null;
};

export default SmoothScroll;

const LenisComponent = ({ duration }) => {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration,
      gestureDirection: "vertical",
      mouseMultiplier: 1,
      smoothTouch: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // default
      smooth: true,
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
