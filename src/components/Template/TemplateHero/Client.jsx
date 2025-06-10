"use client";
import { ArrowOutwardIcon } from "@/components/Home/icons";
import styles from "./TemplateHero.module.css";
import { scrollToElement } from "@/utils/document";

const ButtonScroll = ({}) => {
  return (
    <button 
    onClick={() => {
        scrollToElement("#templateSection" , 100)
    }}
    className={`${styles.btn} flex-c`}>
      see more
      <span className="flex-c">
        <ArrowOutwardIcon />
      </span>
    </button>
  );
};

export default ButtonScroll;
