import styles from "./AsyncButton.module.css";
import Spinner from "@/_components/Shared/Spinner/Spinner";

const AsyncButton = ({
  loading = false,
  type = "submit",
  className,
  onClick,
  onLoading = "loading",
  text = "button",
  error = null,
  disabled = false,
  spinnerColor = "black",
  theme = null,
  reverseTheme = false,
}) => {
  
  return (
    <button
      type={type}
      disabled={disabled || loading || error}
      onClick={onClick}
      className={`${styles.AsyncButton} flex-c  ${className}`}
    >
      {loading ? (
        <>
          <Spinner
            theme={reverseTheme ? (theme === "dark" ? "light" : "dark") : theme}
            color={spinnerColor}
            size={17}
          />
          {onLoading}
        </>
      ) : (
        error || text
      )}
    </button>
  );
};

export default AsyncButton;
