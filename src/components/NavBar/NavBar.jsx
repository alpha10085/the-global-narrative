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
const NavBar = () => {

  const { session= null, isLoading = true } = {}
  const [openMobil, setOpenMobile] = useState(false);
  const BurgerBtnRef = useRef(null);
  const links = {
    right: [
      // {
      //   href: "/sign-up",
      //   text: "sign up",
      // },
    ],
    left: [
    ],
  };
  return (
    <header className={styles.header}>
      <div className={styles.wrapperHeader}>
        <nav className={styles.nav}>
          <ul className={`flex al-i-c ${styles.leftUl}`}>
            {links?.left?.map((val) => (
              <li key={val?.text}>
                <Link className="flex-c " href={val?.href}>
                  {val?.text}
                  <ArrowOutwardIcon />
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
