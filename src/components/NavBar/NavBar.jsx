/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./NavBar.module.css";
import MobileNav from "./mobileNav/MobileNav";
import { useAuth } from "@/contexts/AuthProvider";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import Img from "../Shared/img/Img";
import { BurgerIcon, ProfileIcon } from "./Icons/Icons";
import Link from "../Shared/LocalizedLink/Link";
import MainLogo from "../MainLogo/MainLogo";
import { usePathname } from "@/hooks/useTranslations";
import { links } from "./Links";
const NavBar = () => {
  const { session = null, isLoading = true } = {};
  const [openMobil, setOpenMobile] = useState(false);
  const [navMode, setNavMode] = useState(false);
  const BurgerBtnRef = useRef(null);
  const { pathname, pathes } = usePathname();
  const transparentPathes = [
    "/",
    "/podcast",
    // "/priority-region"
  ];
  const darkModePathes = [
    //  "/priority-region"
  ];

  const targetScroll = 250;
  useEffect(() => {
    const listenScrollEvent = (event) => {
      if (window.scrollY > targetScroll) {
        return setNavMode(true);
      } else {
        return setNavMode(false);
      }
    };
    if (!transparentPathes?.includes(pathname)) {
      setNavMode(true);
    } else {
      setNavMode(false);
      window.addEventListener("scroll", listenScrollEvent);
    }
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.wrapperHeader}>
        <nav
          className={`${styles.nav} ${
            navMode ? styles.active : ""
          } flex just-sb gap15`}
        >
          <MainLogo
            theme={!navMode ? "dark" : "light"}
            classNameWrapper={styles.logo}
          />
          <ul className={`flex al-i-c gap40 ${styles.rightUl}`}>
            {links?.map((val, index) => (
              <li
              key={index}
            >
                <Link
                  style={{
                    animationDelay: `${index * 200 + 500}ms`,
                  }}
                  className={`${styles.link} 
                  ${pathes?.[0] === val?.href ? styles.active : ""}
                  flex-c`}
                  href={val?.href}
                >
                  {val?.text}
                </Link>
              </li>
            ))}
          </ul>

          <BurgerIcon
            ref={BurgerBtnRef}
            className={styles.burgerIcon}
            onClick={() => setOpenMobile(!openMobil)}
            isOpen={openMobil}
          />
        </nav>
      </div>
      <MobileNav
        ref={BurgerBtnRef}
        isOpen={openMobil}
        SetOpen={setOpenMobile}
      />
    </header>
  );
};

export default NavBar;
