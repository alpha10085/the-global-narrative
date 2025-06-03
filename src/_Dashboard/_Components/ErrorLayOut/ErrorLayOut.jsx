import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import styles from "./ErrorLayOut.module.css";
import WifiTetheringErrorIcon from "@mui/icons-material/WifiTetheringError";
const ErrorLayOut = ({ callBack }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`${styles.container} showSmooth flex-c column gap30 `}
    >
      <div
        className={`${styles.wrapContainer} ${theme?.containerDanger20} ${theme?.textdanger10} flex-c column gap10 `}
      >
        <h1 className="flex-c gap10">
          <WifiTetheringErrorIcon /> something went wrong !
        </h1>
        <button
          onClick={callBack}
          className={`${theme?.danger10} ${styles.button} `}
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorLayOut;
