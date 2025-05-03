import Img from "../Shared/img/Img";
import styles from "./MainLogo.module.css";

const MainLogo = ({ theme = "light", className = "" }) => {
  return (
    <Img
      disableSkeleton
      className={`${styles.logo} ${className}`}
      url={`/main-logo-${theme !== "light" ? "white" : "black"}.png`}
    />
  );
};

export default MainLogo;
