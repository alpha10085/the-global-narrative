"use client";
import LinkTransition from "../Shared/LinkTransition/LinkTransition";
import styles from "./MainLink.module.css";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const MainLink = ({
  href = "/",
  text = "Go",
  icon = <ArrowOutwardIcon />,
  className = "",
}) => {
  return (
    <LinkTransition
      href={href}
      className={`${styles.link} flex gap5 al-i-c ${className}`}
    >
      <span className={`${styles.contnet} flex al-i-c`}>{text}</span>
      <span className={`${styles.arrow} flex-c`}>{icon}</span>
    </LinkTransition>
  );
};

export default MainLink;
