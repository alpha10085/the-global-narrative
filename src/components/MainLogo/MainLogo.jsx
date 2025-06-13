import Img from "../Shared/img/Img";
import Link from "../Shared/Link/Link";
import LinkTransition from "../Shared/LinkTransition/LinkTransition";
import styles from "./MainLogo.module.css";

const MainLogo = ({
  theme = "light",
  classNameWrapper = "",
  classNameImg = "",
}) => {
  return (
    <LinkTransition 
    href={"/"}
    className={`${classNameWrapper} ${styles.wrapper}`}>
      <Img
        disableSkeleton
        className={`${styles.logo} ${
          theme === "light" ? styles.active : ""
        } ${classNameImg}`}
        url={`/main-logo-fu-black.png`}
      />
      <Img
        disableSkeleton
        className={`${styles.logo} ${
          theme === "dark" ? styles.active : ""
        } ${classNameImg}`}
        url={`/main-logo-fu-white.png`}
      />
    </LinkTransition>
  );
};

export default MainLogo;
