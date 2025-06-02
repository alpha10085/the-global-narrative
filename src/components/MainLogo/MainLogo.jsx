import Img from "../Shared/img/Img";
import Link from "../Shared/LocalizedLink/Link";
import styles from "./MainLogo.module.css";

const MainLogo = ({
  theme = "light",
  classNameWrapper = "",
  classNameImg = "",
}) => {
  return (
    <Link 
    href={"/"}
    className={`${classNameWrapper} ${styles.wrapper}`}>
      <Img
        disableSkeleton
        className={`${styles.logo} ${
          theme === "light" ? styles.active : ""
        } ${classNameImg}`}
        url={`/main-logo-f-black.png?`}
      />
      <Img
        disableSkeleton
        className={`${styles.logo} ${
          theme === "dark" ? styles.active : ""
        } ${classNameImg}`}
        url={`/main-logo-f-white.png?`}
      />
    </Link>
  );
};

export default MainLogo;
