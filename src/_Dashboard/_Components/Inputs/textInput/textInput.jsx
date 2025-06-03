"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import styles from "./textinput.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorMessage from "@/_Dashboard/_Components/ErrorMessage/ErrorMessage";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";
import { useClickOut } from "@/hooks/useClickout";
import { debounce } from "lodash";
import LockIcon from "@mui/icons-material/Lock";
import { textDir } from "@/utils/text";

const TextInputComponent = ({
  onChange = () => "",
  show = true,
  theme,
  className = "",
  field = {},
  currentValue = "",
  error = null,
  translations,
  watch,
}) => {
  
  const [value, setValue] = useState(currentValue || "");
  const [showText, setShowText] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Handle click outside to remove focus
  const { ref } = useClickOut({
    onClickOutside: () => setIsFocused(false),
  });

  // Toggle password visibility
  const toggleVisibility = () => {
    setShowText((prev) => !prev);
  };

  // Debounced callback to handle changes
  const debouncedOnChange = useCallback(
    debounce((val) => {
      onChange(field?.name, val?.toString()?.trim());
    }, 500),
    [field?.name, onChange]
  );

  // Handle input value changes
  const handleInputChange = (val) => {
    setValue(val);
    debouncedOnChange(val);
  };

  // Determine input type (password/text/other)
  const inputType =
    field?.type === "password" ? (showText ? "text" : "password") : field?.type;

  useEffect(() => {
    const currentVal = watch(field?.name);
    if (!currentVal && field?.default) {
      handleInputChange(field?.default);
    }
  }, [field]);
  
  return (
    <label
      id={handleReplaceDot(field?.name)}
      className={`flex column showSmooth ${styles.label} ${className}`}
    >
      {/* Input label with optional readonly indicator */}
      <h1 className="flex al-i-c gap5">
        {field?.label}
        {field?.readOnly && (
          <span className={`${styles.readOnly} flex al-i-c`}>
            ({translations?.inputs?.readOnly})
            <LockIcon />
          </span>
        )}
      </h1>

      {/* Input wrapper */}
      <div
        ref={ref}
        onClick={() => setIsFocused(true)}
        className={`${styles.inputwrapper} ${styles[theme?.name]} ${field?.type !== "password" && styles.full} ${theme?.background} ${
          theme?.color
        } ${theme?.bord20} ${isFocused && theme.inputFocused} ${
          error && theme.inputError
        }`}
      >
        {/* Input element */}
        <input
          dir={textDir(value)}
          className={`${theme?.color}`}
          type={inputType}
          placeholder={field?.placeholder}
          name={field.name}
          disabled={field?.readOnly}
          value={value}
          autoComplete="new-password"
          onChange={({ target }) => handleInputChange(target?.value)}
        />

        {/* Password visibility toggle */}
        {field?.type === "password" && (
          <span onClick={toggleVisibility} className={`${styles.icon} flex-c`}>
            {showText ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </span>
        )}
      </div>

      {/* Error message display */}
      <ErrorMessage theme={theme}
        className={`${styles.errormsg}`}
        message={error}
         
      />
    </label>
  );
};

// Custom memoization logic for TextInput
const textInputMemoization = (prevProps, nextProps) => {
  return (
    prevProps?.currentValue === nextProps?.currentValue &&
    prevProps?.theme?.name === nextProps?.theme?.name &&
    prevProps?.error === nextProps?.error &&
    prevProps?.field?.name === nextProps?.field?.name
  );
};

// Export memoized TextInput component
const TextInput = memo(TextInputComponent, textInputMemoization);

export default TextInput;
