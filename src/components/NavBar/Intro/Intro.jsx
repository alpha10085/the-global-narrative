"use client";

import { memo, useEffect, useCallback } from "react";
import styles from "./Intro.module.css";
import MainLogo from "@/components/MainLogo/MainLogo";
import { delay } from "@/utils/delay";
import useDynamicState from "@/hooks/useDynamicState";
import useScrollControl from "@/hooks/useScrollControl";
import { usePathname } from "@/hooks/useTranslations";
import eventBus from "@/utils/eventBus";
import { videoKey } from "../helpers";

const Intro = ({ theme = "dark",isUnderTest=false, classNameWrapper = "" }) => {
  const { pathname } = usePathname();
  const isHome = pathname === "/";

  const [state, setState] = useDynamicState({
    event: false,
    isFinished: false,
    hide: false,
  });

  const { disableScroll, enableScroll } = useScrollControl({ default: false });
  const { event, isFinished, hide } = state;

  const showIntro = isHome && !hide && !isUnderTest

  const runSequence = useCallback(async () => {
    disableScroll();
 
    // await delay(1600);
    // setState({ isFinished: true });
    // await delay(500);
    // eventBus.emit(videoKey, "play");
    // setState({ hide: true });
    // enableScroll();
  }, [disableScroll, enableScroll, setState]);

  useEffect(() => {
    if (!showIntro) return;
    runSequence();
    return enableScroll;
  }, [showIntro, runSequence, enableScroll]);

  useEffect(() => {
    // fallback to ensure video plays even if intro is skipped
    if (!showIntro) {
      const t1 = setTimeout(() => eventBus.emit(videoKey, "play"), 350);
      const t2 = setTimeout(() => eventBus.emit(videoKey, "play"), 550);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isHome]);

  const logoClassName = !showIntro
    ? classNameWrapper
    : `${styles.animatedLogo} ${event ? styles.logoToCorner : ""} ${
        hide ? styles.hide : ""
      }`;

  return (
    <>
      <MainLogo
        classNameWrapper={logoClassName}
        theme={!showIntro ? theme : "dark"}
      />
      <div /> {/* Reserved space under logo */}
      <div
        className={`${styles.container} 
         ${!showIntro ? styles.hide : ""}
         ${isFinished ? styles.isfinished : ""}`}
      />
    </>
  );
};

export default memo(
  Intro,
  (prev, next) =>
    prev.classNameWrapper === next.classNameWrapper &&
    prev.theme === next.theme
);
