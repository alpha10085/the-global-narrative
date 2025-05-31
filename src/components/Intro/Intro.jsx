"use client";
import { useEffect, useRef, useState } from "react";
import Img from "../Shared/img/Img";
import styles from "./Intro.module.css";
import useDisableScroll from "@/hooks/useDisableScroll";
import eventBus from "@/utils/eventBus";
import useDynamicState from "@/hooks/useDynamicState";
import { delay } from "@/utils/delay";

const Intro = () => {
  const logoRef = useRef();
  const [state, setState] = useDynamicState({ event: true, hide: false });
  const { event, hide } = state;
  const ToggleDisableScroll = useDisableScroll();

  const handleMouseMove = (e) => {
    if (!event) return;
    const { innerWidth, innerHeight } = window;
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;

    // control intensity
    const rotateY = (offsetX / centerX) * 10; // max 10deg left/right
    const rotateX = (-offsetY / centerY) * 10; // max 10deg up/down
    const scale = 1.05;

    // slight skew for bending effect
    const skewX = (offsetX / centerX) * 2; // max 2deg
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
        scale(1)
      `;
    }
  };

  const handleHide = async () => {
    resetTransform();
    ToggleDisableScroll();
    setState({
      event: false,
    });
    eventBus.emit("intro-event", false);
    await delay(200);
    setState({
      hide: true,
    });
  };

  useEffect(() => {
    eventBus.emit("intro-event", event);
    return () => {};
  }, [event]);

  // if (hide) return null

  return (
    <div
      // data-cursor-label="← DRAG →"
      data-cursor-label="Enter →"

      // data-cursor-color="#5D27FF"
      onClick={handleHide}
      onMouseMove={handleMouseMove}
      //  onMouseLeave={resetTransform}
      className={`flex-c ${styles.container}
      ${event ? styles.show : styles.hide}

      ${hide ? styles.hideFull : ""}

      
      `}
    >
      <Img
        disableSkeleton
        ref={logoRef}
        className={styles.poster}
        url="/main-logo-full-white.png"
      />
    </div>
  );
};

export default Intro;
