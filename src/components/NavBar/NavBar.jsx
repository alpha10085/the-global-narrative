/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useRef, useState } from "react";
import styles from "./NavBar.module.css";
import MobileNav from "./mobileNav/MobileNav";
import { useAuth } from "@/contexts/AuthProvider";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import Img from "../Shared/img/Img";
import { BurgerIcon, ProfileIcon } from "./Icons/Icons";
import Link from "../Shared/LocalizedLink/Link";
import MainLogo from "../MainLogo/MainLogo";
import { usePathname } from "@/hooks/useTranslations";
const NavBar = () => {
  const { session = null, isLoading = true } = {};
  const [openMobil, setOpenMobile] = useState(false);
  const BurgerBtnRef = useRef(null);
  const { pathes } = usePathname();
  console.log("🚀 ~ NavBar ~ pathes:", pathes);
  const links = [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "About Us",
      href: "/about-us",
    },
    {
      text: "Blog",
      href: "/blog",
    },
    {
      text: "clients",
      href: "/clients",
    },
    {
      text: "services",
      href: "/services",
    },
    {
      text: "media center",
      href: "/media-center",
    },
  ];
  return (
    <header className={styles.header}>
      <div className={styles.wrapperHeader}>
        <nav className={`${styles.nav} flex just-sb gap15`}>
          <MainLogo theme="dark" className={styles.logo} />
          <ul className={`flex al-i-c gap40 ${styles.rightUl}`}>
            {links?.map((val, index) => (
              <li key={val?.text}>
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
