"use client";
import useDynamicState from "@/hooks/useDynamicState";
import { delay } from "@/utils/delay";
import eventBus from "@/utils/eventBus";
import Lenis from "lenis";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

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

const LenisComponent = ({ duration = 1.2 }) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration,
      smoothWheel: true,
      smoothTouch: false, // Disable on touch devices for better performance & UX
      direction: "vertical",
      wheelMultiplier: 0.8, // Adjust scroll sensitivity if needed
      lerp: 0.02, // control interpolation (0 to 1)
    });

    lenisRef.current = lenis;

    const update = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, [duration]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      lenisRef.current?.scrollTo(0, { immediate: true });
    }, 100); // Delay for DOM readiness

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default LenisComponent;
