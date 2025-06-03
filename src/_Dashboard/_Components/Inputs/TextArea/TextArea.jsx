"use client";
import ErrorMessage from "@/_Dashboard/_Components/ErrorMessage/ErrorMessage";
import styles from "./TextArea.module.css";
import React, { useCallback, useState } from "react";
import { useClickOut } from "@/hooks/useClickout";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";
import { debounce } from "lodash";

import LockIcon from "@mui/icons-material/Lock";
import { textDir } from "@/utils/text";
const Component = ({
  onChange = () => "",
  show = true,
  theme,
  className = "",
  field = {},
  currentValue = "",
  error = null,
  translations ={}
}) => {
  const { name, label, placeholder, readOnly, fullSize = false } = field;
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(currentValue || "");

  const { ref } = useClickOut({
    onClickOutside: () => setActive(false),
  });
  const onChangeCallBack = useCallback(
    debounce((value) => {
      onChange(name, value?.toString()?.trim());
    }, 500),
    [name] // Dependencies
  );

  const handleChange = (v) => {
    setValue(v);
    onChangeCallBack(v);
  };

  const handleMakeActive = () => {
    
    setActive(true);
  };
  return (
    <label
      id={handleReplaceDot(name)}
      className={`flex column showSmooth   ${styles.label} ${className}`}
    >
      <h1 className="flex al-i-c gap5">
        {field?.label}
        {field?.readOnly && (
          <span className={`${styles.readOnly} flex al-i-c`}>
            ({translations?.inputs?.readOnly})
            <LockIcon />
          </span>
        )}
      </h1>
      <div
        ref={ref}
        onClick={handleMakeActive}
        open={active}
        className={`${styles.inputwrapper} ${active && theme.inputFocused} ${
          error && theme.inputError
        }  ${theme?.background}  ${theme?.color} ${theme?.bord20}`}
      >
        <textarea
              dir={textDir(value)}
          onChange={({ target }) => handleChange(target?.value)}
          className={`${theme?.color} ${theme.scrollBar} ${styles.textarea}`}
          value={value}
          disabled={readOnly}
          placeholder={placeholder}
        />
      </div>
      <ErrorMessage theme={theme} className={`${styles.errormsg} `} message={error} label={label}/>
    </label>
  );
};

const TextArea = React.memo(Component, (prevProps, nextProps) => {
  return (
    prevProps?.currentValue === nextProps?.currentValue &&
    prevProps?.theme?.name === nextProps?.theme?.name &&
    prevProps?.error === nextProps?.error &&
    prevProps?.field?.name === nextProps?.field?.name
  );
});
export default TextArea;
