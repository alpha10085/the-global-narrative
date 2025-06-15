import styles from "./MainButton.module.css";
import LinkTransition from "../Shared/LinkTransition/LinkTransition";
const MainButton = ({ text = "", href = "/", className = "" }) => {
  return (
    <LinkTransition
      href=""
      className={`flex gap5 al-i-c ${styles.toggleButton} ${className}`}
    >
      <span className={`${styles.contnet} flex al-i-c`}>{text}</span>
    </LinkTransition>
  );
};

export default MainButton;
