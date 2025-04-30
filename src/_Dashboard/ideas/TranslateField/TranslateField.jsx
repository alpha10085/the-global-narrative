import { useState } from "react";
import styles from "./TranslateField.module.css";
import { useClickOut } from "@/hooks/useClickout";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Window from "./Window/Window";

const TranslateField = ({
  theme,
  className = "",
  field = {},
  endpoint = null,
  id,
  error,
  mode,
  watch,
  validationTransaltions,
  _id,
  type,
}) => {
  const [openWindow, setOpenWindow] = useState(false);
  const [focus, setFocus] = useState(false);
  const { ref } = useClickOut({
    onClickOutside: () => setFocus(false),
  });

  const props = {
    field,
    endpoint,
    theme,
    id,
    mode,
    _id,
    watch,
    validationTransaltions,
    type,
  };

  return (
    <>
      {openWindow && <Window onClose={() => setOpenWindow(false)} {...props} />}
      <label
        ref={ref}
        onClick={() => setOpenWindow(true)}
        className={`flex column showSmooth ${styles.label} ${className}`}
      >
        <h1 className="flex al-i-c gap5">{field?.label} </h1>
        <div
          onClick={() => setFocus(true)}
          className={`${styles.inputwrapper} flex al-i-c just-sb  ${
            theme?.background
          }  ${theme?.color} ${theme?.bord20} ${focus && theme.inputFocused} ${
            error && theme.inputError
          }`}
        >
          <div className={styles.svgwrapper}>
            <LanguageIcon />
            <h1>See all languages</h1>
          </div>
          <div className={styles.arrowIcon}>
            <KeyboardArrowDownIcon />
          </div>
        </div>
      </label>
    </>
  );
};

export default TranslateField;
