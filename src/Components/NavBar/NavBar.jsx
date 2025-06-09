/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./NavBar.module.css";
import MobileNav from "./mobileNav/MobileNav";

import { BurgerIcon } from "./Icons/Icons";
import Link from "../Shared/Link/Link";
import MainLogo from "../MainLogo/MainLogo";
import { usePathname } from "@/hooks/useTranslations";
import { links } from "./Links";

const NavBar = () => {
  const [openMobil, setOpenMobile] = useState(false);
  const BurgerBtnRef = useRef(null);
  const navRef = useRef(null);
  const [navMode, setNavMode] = useState({
    transparent: !true,
    darkMode: !true,
  });
  const { pathname, pathes } = usePathname();

  const transparentPathes = ["/", "/news/*"];
  const darkModePathes = [];

  // useEffect(() => {
  //   const matchPath = (pattern, path) => {
  //     const regexPattern = pattern
  //       .replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&")
  //       .replace(/\*/g, ".*");
  //     const regex = new RegExp(`^${regexPattern}$`);
  //     return regex.test(path);
  //   };

  //   const isPathInPatterns = (patterns, path) => {
  //     return patterns.some((pattern) => matchPath(pattern, path));
  //   };

  //   const isTransparentPath = isPathInPatterns(transparentPathes, pathname);
  //   const isDarkModePath = isPathInPatterns(darkModePathes, pathname);

  //   const updateNavModeOnScroll = () => {
  //     const section = document.getElementById("active-section");
  //     const navbar = navRef.current;

  //     const offset = parseInt(section?.dataset?.offset) || 0;
  //     const sectionTop =
  //       section?.getBoundingClientRect()?.top + window.scrollY - offset;
  //     const navbarHeight = navbar.offsetHeight;
  //     const scrollPosition = window.scrollY;

  //     const shouldActivate =
  //       isTransparentPath && scrollPosition + navbarHeight >= sectionTop;

  //     if (shouldActivate) {
  //       setNavMode({
  //         transparent: false,
  //         darkMode: true,
  //       });
  //     } else {
  //       setNavMode({
  //         transparent: isTransparentPath,
  //         darkMode: isDarkModePath || !isTransparentPath,
  //       });
  //     }
  //   };

  //   updateNavModeOnScroll(); // initial check
  //   window.addEventListener("scroll", updateNavModeOnScroll);
  //   return () => window.removeEventListener("scroll", updateNavModeOnScroll);
  // }, [pathname]);

  //   useEffect(() => {
  //       stopAutoplay();
  //   eventBus.on("intro-event", handleAutoPlay);
  //   return () => eventBus.off("intro-event", handleAutoPlay);
  // }, []);

  return (
    <header className={styles.header}>
      <div className={styles.wrapperHeader}>
        <nav
          ref={navRef}
          className={`
            ${styles.nav}
            ${navMode.transparent ? styles.transparent : ""}
            ${navMode.darkMode ? styles.darkMode : ""}
            flex just-sb gap15
          `}
        >
          <MainLogo
            theme={!navMode.darkMode ? "dark" : "light"}
            classNameWrapper={styles.logo}
          />

          <ul className={`flex al-i-c gap40 ${styles.rightUl}`}>
            {links?.map((val, index) => (
              <li key={index}>
                <Link
                  style={{ animationDelay: `${index * 200 + 500}ms` }}
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
        pathname={pathname}
        SetOpen={setOpenMobile}
      />
    </header>
  );
};

export default NavBar;
