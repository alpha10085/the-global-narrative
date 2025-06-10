"use client";
import { useEffect, useRef } from "react";
import Img from "../Shared/img/Img";
import styles from "./Intro.module.css";
import useDisableScroll from "@/hooks/useDisableScroll";
import eventBus from "@/utils/eventBus";
import useDynamicState from "@/hooks/useDynamicState";
import { delay } from "@/utils/delay";
import { usePathname } from "@/hooks/useTranslations";

// Track outside the component to persist across re-renders
let hasSeenIntro = false;

const Intro = () => {
  const { pathname } = usePathname();
  const logoRef = useRef();
  const [state, setState] = useDynamicState({
    event: true,
    hide: false,
    loaded: false,
  });
  const { event, hide, loaded } = state;
  const ToggleDisableScroll = useDisableScroll(false);

  // Conditionally block the intro
  const shouldShowIntro = pathname === "/" && !hasSeenIntro;

  const handleMouseMove = (e) => {
    if (!event) return;
    const { innerWidth, innerHeight } = window;
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;

    const rotateY = (offsetX / centerX) * 10;
    const rotateX = (-offsetY / centerY) * 10;
    const scale = 1.05;
    const skewX = (offsetX / centerX) * 2;
    const skewY = (offsetY / centerY) * 2;

    if (logoRef.current) {
      logoRef.current.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        skewX(${skewX}deg)
        skewY(${skewY}deg)
        scale(${scale})
      `;
    }
  };

  const resetTransform = () => {
    if (logoRef.current) {
      logoRef.current.style.transform = `
        rotateX(0deg)
        rotateY(0deg)
        skewX(0deg)
        skewY(0deg)
      `;
    }
  };

  const handleHide = async () => {
    resetTransform();
    setState({ event: false });
    ToggleDisableScroll();
    await delay(800);
    setState({ hide: true });
    hasSeenIntro = true; // Mark as seen after hide
  };

  useEffect(() => {
    if (!shouldShowIntro) {
      // Skip animation entirely
      setState({ hide: true });
      hasSeenIntro = true;
      return;
    }
    delay(300).then(() => {
      setState({ loaded: true });
      ToggleDisableScroll();
    });
  }, [pathname]);

  useEffect(() => {
    eventBus.emit("intro-event", event);
  }, [event]);

  if (hide) return null;

  return (
    <div
      data-cursor-label="Enter →"
      onClick={handleHide}
      style={{
        pointerEvents: loaded ? "unset" : "none",
      }}
      onMouseMove={handleMouseMove}
      className={`flex-c ${styles.container} ${
        event ? styles.show : styles.hide
      }`}
    >
      <Img
        disableSkeleton
        ref={logoRef}
        className={styles.poster}
        url="/main-logo-fu-white.png"
      />
    </div>
  );
};

export default Intro;
