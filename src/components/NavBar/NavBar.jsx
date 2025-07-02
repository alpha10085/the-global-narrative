"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { memo } from "react";
import styles from "./NavBar.module.css";
import MobileNav from "./mobileNav/MobileNav";
import { BurgerIcon } from "./Icons/Icons";
import Link from "../Shared/Link/Link";
import MainLogo from "../MainLogo/MainLogo";
import { usePathname } from "@/hooks/useTranslations";
import { enabledLinks } from "./helpers";
import LinkTransition from "../Shared/LinkTransition/LinkTransition";
import { delay } from "@/utils/delay";
import useDynamicState from "@/hooks/useDynamicState";
import Intro from "./Intro/Intro";

const NavBar = () => {
  const [openMobil, setOpenMobile] = useState(false);
  const BurgerBtnRef = useRef(null);
  const navRef = useRef(null);

  const [navMode, setNavMode] = useDynamicState({
    transparent: true,
    darkMode: true,
    darkLogo: false,
    nonFixed: false,
    isMounted: false,
  });

  const { pathname, pathes } = usePathname();

  const transparentPathes = [
    { path: "/", minWidth: 0, maxWidth: Infinity },
    { path: "/news/*", minWidth: 0, maxWidth: Infinity },
    { path: "/contact-us", minWidth: 0, maxWidth: 768 },
    { path: "/about-us", minWidth: 0, maxWidth: Infinity },
    { path: "/services", minWidth: 0, maxWidth: Infinity },
  ];

  const darkModePathes = [];
  const transparentDarkLogoPathes = [];
  const transparentDarkModeLightLogoPathes = [
    { path: "/contact-us", minWidth: 768, maxWidth: Infinity },
  ];

  const nonFixedNavRoutes = [
    { path: "/services", minWidth: 0, maxWidth: Infinity },
  ];

  const isPathInPatterns = useCallback((patterns, path, width) => {
    return patterns.some(({ path: pattern, minWidth = 0, maxWidth = Infinity }) => {
      const regexPattern = pattern.replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, ".*");
      const regex = new RegExp(`^${regexPattern}$`);
      return regex.test(path) && width >= minWidth && width <= maxWidth;
    });
  }, []);

  useEffect(() => {
    const updateNavMode = () => {
      const section = document.getElementById("active-section");
      const navbar = navRef.current;
      const width = window.innerWidth;

      const offset = parseInt(section?.dataset?.offset) || 0;
      const sectionTop = section?.getBoundingClientRect()?.top + window.scrollY - offset;
      const navbarHeight = navbar?.offsetHeight || 0;
      const scrollPosition = window.scrollY;

      const shouldActivate = scrollPosition + navbarHeight >= sectionTop;

      const isTransparentPath = isPathInPatterns(transparentPathes, pathname, width);
      const isDarkModePath = isPathInPatterns(darkModePathes, pathname, width);
      const isDarkLogoPath = isPathInPatterns(transparentDarkLogoPathes, pathname, width);
      const isDarkModeLightLogoPath = isPathInPatterns(transparentDarkModeLightLogoPathes, pathname, width);
      const isNonFixedRoute = isPathInPatterns(nonFixedNavRoutes, pathname, width);

      const matched =
        isTransparentPath || isDarkLogoPath || isDarkModePath || isDarkModeLightLogoPath;

      if (shouldActivate || !matched) {
        setNavMode({
          transparent: false,
          darkMode: true,
          darkLogo: true,
          nonFixed: isNonFixedRoute,
        });
      } else {
        setNavMode({
          transparent: isTransparentPath || isDarkLogoPath || isDarkModeLightLogoPath,
          darkMode: isDarkModePath || isDarkModeLightLogoPath || (!isTransparentPath && !isDarkLogoPath),
          darkLogo: isDarkLogoPath && !isDarkModeLightLogoPath,
          nonFixed: isNonFixedRoute,
        });
      }

      delay(250).then(() => {
        setNavMode({ isMounted: true });
      });
    };

    const handleResize = () => {
      window.requestAnimationFrame(updateNavMode);
    };

    updateNavMode();
    window.addEventListener("scroll", updateNavMode);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", updateNavMode);
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname, isPathInPatterns]);

  const handleBurgerClick = useCallback(() => {
    setOpenMobile((prev) => !prev);
  }, []);

  const renderedLinks = useMemo(() => (
    enabledLinks.map((val, index) => (
      <li key={val.href}>
        <LinkTransition
          style={{ animationDelay: `${index * 200 + 500}ms` }}
          className={`${styles.link} 
            ${pathes?.[0] === val?.href ? styles.active : ""}
            flex-c`}
          href={val?.href}
        >
          {val?.text}
        </LinkTransition>
      </li>
    ))
  ), [enabledLinks, pathes]);

  return (
    <header className={styles.header}>
      <div className={styles.wrapperHeader}>
        {!navMode.nonFixed && (
          <div
            className={`${styles.bg} ${
              navMode.transparent ? styles.transparent : ""
            }`}
          />
        )}
        <nav
          ref={navRef}
          className={`
            ${styles.nav}
            ${!navMode.nonFixed ? styles.fixed : ""}
            ${navMode.transparent ? styles.transparent : ""}
            ${navMode.darkMode ? styles.darkMode : ""}
            flex gap15
          `}
        >
          <Intro
            theme={navMode?.darkLogo ? "light" : "dark"}
            classNameWrapper={styles.logo}
          />

          <ul
            className={`flex al-i-c gap40 ${styles.rightUl} ${
              navMode.isMounted ? styles.show : styles.hide
            }`}
          >
            {renderedLinks}
          </ul>

          <BurgerIcon
            ref={BurgerBtnRef}
            className={`${navMode.isMounted ? styles.isMounted : styles.hide} ${
              styles.burgerIcon
            }`}
            onClick={handleBurgerClick}
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

export default memo(NavBar);
