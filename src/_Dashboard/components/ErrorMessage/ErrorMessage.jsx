import React, { useState } from "react";
import styles from "./ErrorMessage.module.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const ErrorMessage = ({ className = "", message = null, theme }) => {

  return (
    <span
      className={`error-message-validation t-f-cap ml-5 flex al-i-c  ${styles.mesage} ${theme.containerDanger20} ${!message && styles.close}  ${className}`}
    >
      {message ? (
        <>
          <ErrorOutlineIcon />
           {message}
        </>
      ) : (
        ""
      )}
    </span>
  );
};

export default ErrorMessage;
