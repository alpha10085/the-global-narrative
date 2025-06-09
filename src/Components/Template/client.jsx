"use client";

import styles from "./Template.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { scrollToElement } from "@/utils/document";
export const ButtonSeeMore = ({
  textButton = "see more ",
  className,
  title,
}) => {
  const handlescroll = () => {
    scrollToElement(`#${title}`, 100);
  };
  return (
    <button
      onClick={handlescroll}
      className={`${styles.btnseemore} flex gap10 al-i-c`}
    >
      {textButton}
      <ArrowForwardIcon />
    </button>
  );
};

export const ArrowIcon = ({ className }) => (
  <div className={className}>
    <ArrowForwardIcon />
  </div>
);
