import React from "react";
import styles from "./PopupDelete.module.css";
import CloseIcon from "@mui/icons-material/Close";
const PopupDelete = ({
  open,
  onClose,
  onConfirm,
  loading,
  theme,
  translations,
}) => {
  if (!open) return null;

  const { title, firstLine, secLine } = translations?.PopupDelte;
  return (
    <div className={`${styles.popupOverlay} ${theme.backgroundOverlay}`}>
      <div
        className={`${styles.popupContainer} gap10 ${theme.bord20} ${theme.background}`}
      >
        <div
          className={`${styles.popupHeader} flex t-al-c ${theme.textdanger10}`}
        >
          <h2>{title}</h2>
          <button
            className={`${styles.closeButton} ${theme.button}`}
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
        <div className={styles.popupBody}>
          <p>{firstLine}</p>
          <p>{secLine}</p>
        </div>
        <div className={`${styles.popupActions} flex  gap20`}>
          <button
            className={`${styles.cancelButton} ${theme?.color}`}
            onClick={onClose}
            disabled={loading}
          >
            {translations?.cancel}
          </button>
          <button
            className={`${styles.confirmButton} ${theme?.danger10} `}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? `${translations?.deleting}` : `${translations?.delete}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupDelete;
