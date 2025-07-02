"use client";

import { memo, useEffect, useState } from "react";
import styles from "./Intro.module.css";
import MainLogo from "@/components/MainLogo/MainLogo";
import { delay } from "@/utils/delay";
import useDynamicState from "@/hooks/useDynamicState";
import useDisableScroll from "@/hooks/useDisableScroll";
import { usePathname } from "@/hooks/useTranslations";

const Intro = ({ theme = "dark", classNameWrapper = "" }) => {
  const { pathname } = usePathname();
  console.log("pathname");

  const [state, setState] = useDynamicState({
    event: false,
    isfinished: false,
    hide: false,
  });

  const { disableScroll, enableScroll } = useDisableScroll({
    default: false,
  });
  const { event, isfinished, hide } = state;

  const handleEvent = async () => {
    disableScroll();
    await delay(1500);
    setState({
      event: true,
    });
    await delay(1600);
    setState({
      isfinished: true,
    });
    await delay(500);
    setState({
      hide: true,
    });
    enableScroll();
  };

  useEffect(() => {
    handleEvent();
  }, []);

  const logoClassname = hide
    ? classNameWrapper
    : `
          ${styles.animatedLogo} ${event ? styles.logoToCorner : ""}
        ${hide ? styles.hide : ""}
        `;

  return (
    <>
      <MainLogo
        classNameWrapper={logoClassname}
        theme={hide ? theme : "dark"}
      />

      <div className=""></div>

      <div
        className={`${styles.container} 
         ${hide ? styles.hide : ""}
        ${isfinished ? styles.isfinished : ""}`}
      ></div>
    </>
  );
};

export default memo(Intro, (prev, next) => {
  return (
    prev?.classNameWrapper === next?.classNameWrapper &&
    prev?.theme === next?.theme
  );
});
