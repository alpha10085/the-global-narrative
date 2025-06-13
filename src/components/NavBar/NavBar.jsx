"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./NavBar.module.css";
import MobileNav from "./mobileNav/MobileNav";

import { BurgerIcon } from "./Icons/Icons";
import Link from "../Shared/Link/Link";
import MainLogo from "../MainLogo/MainLogo";
import { usePathname } from "@/hooks/useTranslations";
import { enabledLinks } from "./helpers";
import LinkTransition from "../Shared/LinkTransition/LinkTransition";

const NavBar = () => {
  const [openMobil, setOpenMobile] = useState(false);
  const BurgerBtnRef = useRef(null);
  const navRef = useRef(null);
  const [navMode, setNavMode] = useState({
    transparent: true,
    darkMode: true,
    darkLogo: false, // ✅
  });
  const { pathname, pathes } = usePathname();

  const transparentPathes = ["/", "/news/*"];
  const darkModePathes = [];

  const transparentDarkLogoPathes = ["/faq"]; // example paths
  useEffect(() => {
    const matchPath = (pattern, path) => {
      const regexPattern = pattern
        .replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&")
        .replace(/\*/g, ".*");
      const regex = new RegExp(`^${regexPattern}$`);
      return regex.test(path);
    };

    const isPathInPatterns = (patterns, path) => {
      return patterns.some((pattern) => matchPath(pattern, path));
    };

    const isTransparentPath = isPathInPatterns(transparentPathes, pathname);
    const isDarkModePath = isPathInPatterns(darkModePathes, pathname);
    const isDarkLogoPath = isPathInPatterns(
      transparentDarkLogoPathes,
      pathname
    );

    const updateNavModeOnScroll = () => {
      const section = document.getElementById("active-section");
      const navbar = navRef.current;

      const offset = parseInt(section?.dataset?.offset) || 0;
      const sectionTop =
        section?.getBoundingClientRect()?.top + window.scrollY - offset;
      const navbarHeight = navbar.offsetHeight;
      const scrollPosition = window.scrollY;

      const shouldActivate = scrollPosition + navbarHeight >= sectionTop;

      if (shouldActivate) {
        setNavMode({
          transparent: false,
          darkMode: true,
          darkLogo: true,
        });
      } else {
        setNavMode({
          transparent: isTransparentPath || isDarkLogoPath,
          darkMode: isDarkModePath || (!isTransparentPath && !isDarkLogoPath),
          darkLogo: isDarkLogoPath, // ✅ enable dark logo when needed
        });
      }
    };

    updateNavModeOnScroll();
    window.addEventListener("scroll", updateNavModeOnScroll);
    return () => window.removeEventListener("scroll", updateNavModeOnScroll);
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
            theme={navMode.darkMode || navMode.darkLogo ? "light" : "dark"}
            classNameWrapper={styles.logo}
          />

          <ul className={`flex al-i-c gap40 ${styles.rightUl}`}>
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
