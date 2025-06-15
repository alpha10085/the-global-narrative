"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

const NavBar = () => {
  const [openMobil, setOpenMobile] = useState(false);
  const BurgerBtnRef = useRef(null);
  const navRef = useRef(null);
  const [navMode, setNavMode] = useDynamicState({
    transparent: true,
    darkMode: true,
    darkLogo: false,
    isMounted: false,
  });

  const { pathname, pathes } = usePathname();

  // 👇 Add minWidth and maxWidth per path
  const transparentPathes = [
    { path: "/", minWidth: 0, maxWidth: Infinity },
    { path: "/news/*", minWidth: 0, maxWidth: Infinity },
    { path: "/contact-us", minWidth: 0, maxWidth: 768 },
  ];

  const darkModePathes = [];

  const transparentDarkLogoPathes = [];

  const transparentDarkModeLightLogoPathes = [
    { path: "/contact-us", minWidth: 768, maxWidth: Infinity },
  ];

  // 👇 Updated matcher to support both minWidth and maxWidth
  const isPathInPatterns = (patterns, path, width) => {
    return patterns.some(
      ({ path: pattern, minWidth = 0, maxWidth = Infinity }) => {
        const regexPattern = pattern
          .replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&")
          .replace(/\*/g, ".*");
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(path) && width >= minWidth && width <= maxWidth;
      }
    );
  };

  useEffect(() => {
    const updateNavMode = () => {
      const section = document.getElementById("active-section");
      const navbar = navRef.current;
      const width = window.innerWidth;

      const offset = parseInt(section?.dataset?.offset) || 0;
      const sectionTop =
        section?.getBoundingClientRect()?.top + window.scrollY - offset;
      const navbarHeight = navbar?.offsetHeight || 0;
      const scrollPosition = window.scrollY;

      const shouldActivate = scrollPosition + navbarHeight >= sectionTop;

      const isTransparentPath = isPathInPatterns(
        transparentPathes,
        pathname,
        width
      );
      const isDarkModePath = isPathInPatterns(darkModePathes, pathname, width);
      const isDarkLogoPath = isPathInPatterns(
        transparentDarkLogoPathes,
        pathname,
        width
      );
      const isDarkModeLightLogoPath = isPathInPatterns(
        transparentDarkModeLightLogoPathes,
        pathname,
        width
      );

      const matched =
        isTransparentPath ||
        isDarkLogoPath ||
        isDarkModePath ||
        isDarkModeLightLogoPath;

      if (shouldActivate || !matched) {
        setNavMode({
          transparent: false,
          darkMode: true,
          darkLogo: true,
        });
      } else {
        setNavMode({
          transparent:
            isTransparentPath || isDarkLogoPath || isDarkModeLightLogoPath,
          darkMode:
            isDarkModePath ||
            isDarkModeLightLogoPath ||
            (!isTransparentPath && !isDarkLogoPath),
          darkLogo: isDarkLogoPath && !isDarkModeLightLogoPath,
        });
      }
      delay(250).then(() =>
        setNavMode({
          isMounted: true,
        })
      );
    };

    const handleResize = () => {
      // Use requestAnimationFrame to avoid layout thrashing
      window.requestAnimationFrame(updateNavMode);
    };

    updateNavMode();
    window.addEventListener("scroll", updateNavMode);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", updateNavMode);
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

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
            theme={navMode.darkLogo ? "light" : "dark"}
            classNameWrapper={styles.logo}
          />

          <ul
            className={`flex al-i-c gap40 ${styles.rightUl} ${
              navMode.isMounted ? styles.show : styles.hide
            }`}
          >
            {enabledLinks?.map((val, index) => (
              <li key={index}>
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
            ))}
          </ul>

          <BurgerIcon
            ref={BurgerBtnRef}
            className={`${navMode.isMounted ? styles.isMounted : styles.hide} ${
              styles.burgerIcon
            }`}
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
