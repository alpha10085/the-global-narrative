import React from "react";

const TextInputs = ({
  callback = () => "",
  show = true,
  theme,
  type,
  className = "",
  currentValue = "",
  disabled = false,
  placeholder = "Enter",
}) => {
  if (!show) return;
  return (
    <input
      className={`${theme?.color} ${className} input `}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      value={currentValue}
      autoComplete="false"
      onChange={({ target }) => callback(target?.value)}
    />
  );
};

export default TextInputs;
