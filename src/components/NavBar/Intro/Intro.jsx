"use client";

import { memo, useEffect } from "react";
import styles from "./Intro.module.css";
import MainLogo from "@/components/MainLogo/MainLogo";
import { delay } from "@/utils/delay";
import useDynamicState from "@/hooks/useDynamicState";
import useScrollControl from "@/hooks/useScrollControl";
import { usePathname } from "@/hooks/useTranslations";

const Intro = ({ theme = "dark", classNameWrapper = "" }) => {
  const { pathname } = usePathname();

  const [state, setState] = useDynamicState({
    event: false,
    isFinished: false,
    hide: false,
  });

  const { disableScroll, enableScroll } = useScrollControl({ default: false });
  const { event, isFinished, hide } = state;

  const isHome = pathname === "/" && !hide;

  useEffect(() => {
    if (!isHome) return;

    let canceled = false;

    const runSequence = async () => {
      disableScroll();

      await delay(1500);
      if (canceled) return;
      setState({ event: true });

      await delay(1600);
      if (canceled) return;
      setState({ isFinished: true });

      await delay(500);
      if (canceled) return;
      setState({ hide: true });

      enableScroll();
    };

    runSequence();

    return () => {
      canceled = true;
      enableScroll();
    };
  }, [isHome]);

  const logoClassName =
    !isHome || hide
      ? classNameWrapper
      : `
          ${styles.animatedLogo}
          ${event ? styles.logoToCorner : ""}
          ${hide ? styles.hide : ""}
        `;

  return (
    <>
      <MainLogo
        classNameWrapper={logoClassName}
        theme={!isHome || hide ? theme : "dark"}
      />
      <div /> {/* Reserved space under logo */}
      <div
        className={`${styles.container} 
         ${!isHome || hide ? styles.hide : ""}
         ${isFinished ? styles.isfinished : ""}`}
      />
    </>
  );
};

export default memo(Intro, (prev, next) =>
  prev.classNameWrapper === next.classNameWrapper &&
  prev.theme === next.theme
);
