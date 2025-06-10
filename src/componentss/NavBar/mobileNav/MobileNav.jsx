"use client";
import React, { forwardRef, useCallback, useEffect } from "react";
import styles from "./mobilenav.module.css";
import Link from "@/componentss/Shared/Link/Link";
import { useClickOut } from "@/hooks/useClickout";
import { links } from "../Links";

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

          {links.map((val, i) => (
            <li key={i}>
              <Link className={`flex-c gap5  ${val.href === pathname && styles.active}`} href={val.href} key={i}>
                {val?.text}
                {val?.icon && val?.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default MobileNav;
