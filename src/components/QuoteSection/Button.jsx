import LinkTransition from "../Shared/LinkTransition/LinkTransition";
import styles from "./QuoteSection.module.css";
import { ArrowOutwardIcon } from "../Home/icons";
const Button = ({ href = "/", label = "", className = "" }) => {
  return (
    <LinkTransition className={`${className} flex al-i-c gap10`} href={href}>
      <span className={styles.content}>{label}</span>
      <span className={`flex-c ${styles.arrow}`}>
        <ArrowOutwardIcon />
      </span>
    </LinkTransition>
  );
};

export default Button;
