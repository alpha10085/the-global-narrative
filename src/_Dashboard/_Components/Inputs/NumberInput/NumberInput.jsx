"use client";
import React, { memo, useEffect, useState } from "react";
import styles from "./NumberInput.module.css";
import ErrorMessage from "@/_Dashboard/_Components/ErrorMessage/ErrorMessage";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";
import { useClickOut } from "@/hooks/useClickout";
import LockIcon from "@mui/icons-material/Lock";
import useTranslationsDashboard from "@/_Dashboard/hooks/useTranslationsDashboard";
const NumberInput = ({
  onChange = () => "",
  show = true,
  theme,
  className = "",
  field = {},
  currentValue,
  error = null,
}) => {
  const {
    max = 10000,
    readOnly,
    name,
    default: defaultVal = 0,
    label,
    placeholder,
    min = 0,
  } = field;
  const [value, setValue] = useState(
    typeof currentValue === "number" ? currentValue : defaultVal
  );
  const [active, setActive] = useState(false);
  const { ref } = useClickOut({
    onClickOutside: () => setActive(false),
  });
  useEffect(() => {
    if (currentValue !== value) {
      setValue(currentValue ? currentValue : defaultVal);
    }
  }, [currentValue]);
  const handleChnage = (v) => {
    let newVal = v ? +v : v;
    if (v > max) {
      newVal = max;
    } else if (v < min) {
      newVal = min;
    }
    setValue(newVal);
    onChange(name, typeof newVal === "number" ? newVal : min);
  };
  if (!show) return;
  
  const translations = useTranslationsDashboard(
    [],
    [
      "inputs.readOnly",
    ]
  );
  
  return (
    <label
      id={handleReplaceDot(field?.name)}
      className={`flex column showSmooth  ${styles.label} ${className}`}
    >
      <h1 className="flex al-i-c gap5">
        {label}{" "}
        {readOnly ? (
          <span className={`${styles.readOnly} flex al-i-c`}>
          ({translations?.inputs?.readOnly})
            <LockIcon />
          </span>
        ) : null}
      </h1>
      <div
        ref={ref}
        onClick={() => setActive(true)}
        className={`${styles.inputwrapper}  ${theme?.background}  ${
          theme?.color
        } ${theme?.bord20} ${active && theme.inputFocused} ${
          error && theme.inputError
        }`}
      >
        <input
          className={`${theme?.color} `}
          type={"number"}
          placeholder={placeholder}
          name={name}
          minLength={min}
          max={max}
          disabled={readOnly}
          value={value}
          autoComplete="false"
          onChange={({ target }) => handleChnage(target?.value)}
        />
      </div>
      <ErrorMessage theme={theme} message={error} label={label}/>
    </label>
  );
};

export default memo(NumberInput, (prevProps, nextProps) => {
  return (
    prevProps.currentValue === nextProps.currentValue &&
    prevProps?.theme?.name === nextProps?.theme?.name &&
    prevProps.error === nextProps.error &&
    prevProps?.field?.name === nextProps?.field?.name
  );
});
