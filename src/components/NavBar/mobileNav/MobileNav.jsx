"use client";
import React, { forwardRef, memo, useCallback, useEffect } from "react";
import styles from "./mobilenav.module.css";
import { useClickOut } from "@/hooks/useClickout";
import LinkTransition from "@/components/Shared/LinkTransition/LinkTransition";
import { enabledLinks } from "../helpers";

const MobileNav = forwardRef(({ isOpen, SetOpen ,pathname }, BtnRemoteRef) => {
  const close = useCallback(() => {
    SetOpen(false);
  }, [SetOpen]);
  const { ref } = useClickOut({
    onClickOutside: close,
    BtnRemoteRef,
  });
  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <div
      className={`${styles.wrapperMobile} ${isOpen ? styles.activeMobile : ""}`}
      ref={ref}
    >
      <div className={styles.MobileNav}>
        <ul onClick={close} className={`${styles.navList} flex column gap10`}>

          {enabledLinks?.map((val, i) => (
            <li key={i}>
              <LinkTransition className={`flex-c gap5  ${val.href === pathname && styles.active}`} href={val.href} key={i}>
                {val?.text}
                {val?.icon && val?.icon}
              </LinkTransition>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default memo(MobileNav);