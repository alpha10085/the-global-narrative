import React, { useState } from "react";
import styles from './ErrorMessage.module.css'
const ErrorMessage = ({ className = '', message = null,  label = ""  }) => {
    return (
        <span className={`error-message-validation t-f-cap ml-5 flex al-i-c gap5 ${styles.mesage} ${!message && styles.close} ${className}`}>
             {message ? `${label} ${message}` : ""}
        </span>
    );
};

export default ErrorMessage;
