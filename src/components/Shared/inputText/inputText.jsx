"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./inputText.module.css";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useClickOut } from "@/hooks/useClickout";
import { JoiGetNestedError } from "@/utils/data";
import { delay } from "@/utils/delay";
const InputText = ({
  onChange = () => {},
  name,
  placeholder,
  showError = false,
  errors,
  className = "",
  type = "text",
  theme = "light",
  watch = () => {},
  autoComplete = false,
  errorClassName = "",
  focus: triggerFocus = false,
  inputClassName = "",
}) => {
  const [focus, setFocus] = useState(false);
  const [hide, sethide] = useState(true);
  const [pending, setPending] = useState(false);
  const inputRef = useRef(null);
  const currentval = watch(name) || ""
  const isEmpty = !!currentval?.length;
  const errormsg = JoiGetNestedError(errors, name) || null;
  const toggleHideText = () => {
    sethide(!hide);
  };

  const onClickOutside = () => {
    setPending(true);
    setFocus(false);
    inputRef.current?.blur();
    delay(400).then(() => {
      setPending(false);
    });
  };
  const handleFoucssClick = () => {
    if (pending) return;
    setFocus(true);
    inputRef.current?.focus();
  };
  const { ref } = useClickOut({
    onClickOutside,
  });
  useEffect(() => {
    autoComplete && handleFoucssClick();
  }, [autoComplete]);
  useEffect(() => {
    if (triggerFocus && inputRef.current) {
      setFocus(true);
      inputRef.current?.focus();
    }
  }, [triggerFocus]);

  return (
    <div
      ref={ref}
      onClick={handleFoucssClick}
      className={`${styles.label} flex column gap5  ${styles?.[theme]} ${className}`}
      htmlFor={name}
    >
      <span
        className={`${styles.placeholder} ${
          errormsg || showError ? styles.errorplaceholder : ""
        }   ${isEmpty || focus ? styles.focus : ""}`}
      >
        {placeholder || name}
      </span>
      <div className={styles.inputWrapper}>
        {type === "textarea" ? (
          <textarea
            value={currentval}
            disabled={pending}
            className={`${styles.input} 
            ${inputClassName}
            ${styles.input}
            ${errormsg || showError ? styles.error : ""}`}
            onFocus={handleFoucssClick}
            onBlur={autoComplete ? () => {} : onClickOutside}
            ref={inputRef}
            onChange={({ target }) => onChange(name, target?.value)}
          />
        ) : (
          <input
            ref={inputRef}
            value={currentval}
            onFocus={handleFoucssClick}
            onBlur={autoComplete ? () => {} : onClickOutside}
            disabled={pending}
            type={type === "password" ? (hide ? "Password" : "text") : type}
            className={`${styles.input}
            
            ${styles.input}
            ${inputClassName}
            ${errormsg || showError ? styles.error : ""}`}
            onChange={({ target }) => onChange(name, target?.value)}
          />
        )}
        {type === "password" ? (
          <span onClick={toggleHideText} className={styles.passwordIcon}>
            {hide ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
          </span>
        ) : (
          ""
        )}
      </div>

      <ErrorMessage className={errorClassName} message={errormsg} />
    </div>
  );
};

export default InputText;
