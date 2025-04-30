"use client";
import styles from "./ArrowCircle.module.css";
import SouthIcon from "@mui/icons-material/South";
import { scrollToElement } from "@/utils/document";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
const ArrowCircle = ({ keySelector, headerOffset = 0 }) => {
  const handleScroll = () => {
    scrollToElement(keySelector, headerOffset);
  };

  return (
    <div className={`${styles.button} flex-c gap5`} onClick={handleScroll}>
      discover more
      <ArrowOutwardIcon />
    </div>
  );
};

export default ArrowCircle;
