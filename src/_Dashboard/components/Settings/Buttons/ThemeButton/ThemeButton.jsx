import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import styles from "./ThemeButton.module.css";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from "@mui/icons-material/NightsStay";
const ThemeButton = ({ className ,   translations = {}}) => {
  const { toggleTheme,  theme } = useTheme();
  return (
    <div className={` flex column ${className} gap5`}>
      <h1 className={styles.title}>{translations?.theme}</h1>
      <button
        className={` ${theme.button} ${styles.btn} flex just-sb al-i-c`}
        onClick={toggleTheme}
      >
        <span className={styles.icon}>
          <NightsStayIcon />{" "}
        </span>
        <span className={styles.icon}>
          <LightModeIcon />
        </span>

        <span
          className={`${styles.state} ${theme?.name === "dark" && styles.dark}`}
        ></span>
      </button>
    </div>
  );
};

export default ThemeButton;
