"use client";
import React from "react";
import styles from "./styles.module.css"
import { scrollTo } from "@/utils/Scroll";

const SideBar = ({data = {}}) => {
  return (
    <aside className={styles.sidebar}>
      <ul className=" p-relative w-100">
        {data?.content?.map((section, index) => (
          <li key={index}>
            <h1
              onClick={() => scrollTo(`#section-${index}`)}
              className={styles.linkButton}
            >
              {section?.title}
            </h1>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
