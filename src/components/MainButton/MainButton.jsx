import styles from "./MainButton.module.css";
import LinkTransition from "../Shared/LinkTransition/LinkTransition";
import { ArrowOutwardIcon } from "../Home/icons";
const MainButton = ({ text = "", href = "/", className = "" }) => {
  return (
    <LinkTransition
      href={href}
      className={`flex gap5 al-i-c ${styles.toggleButton} ${className}`}
    >
      <span className={`${styles.contnet} flex al-i-c`}>{text}</span>

      <span className={`flex-c ${styles.arrow}`}>
        <ArrowOutwardIcon />
      </span>
    </LinkTransition>
  );
};

export default MainButton;
