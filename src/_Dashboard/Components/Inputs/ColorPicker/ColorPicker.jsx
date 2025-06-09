"use client";
import { useEffect, useState } from "react";
import styles from "./ColorPicker.module.css";
import ErrorMessage from "@/_Dashboard/components/ErrorMessage/ErrorMessage";
import { Sketch , } from "@uiw/react-color";
import { useClickOut } from "@/hooks/useClickout";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";


const ColorPicker = ({
  onChange = () => "",
  show = true,
  theme,
  className = "",
  field = {},
  currentValue = "",
  error = null,
}) => {
  const { max = 10000, readOnly, name, label, placeholder, min } = field;
  const [value, setValue] = useState(currentValue);
  const [togglePicker, setTogglePicker] = useState(false);
  const handleChnage = (newVal) => {
    setValue(newVal);
    onChange(name, newVal);
  };
  const { ref } = useClickOut({
    onClickOutside: () => setTogglePicker(false),
  });
  return (
    <label
    id={handleReplaceDot(field?.name)}
      ref={ref}
      className={`flex column showSmooth  ${styles.label} ${className}`}
    >
      <h1>{label}</h1>
      <div
        className={`${styles.inputwrapper} flex ${theme?.background}  ${theme?.color} ${theme?.bord20}`}
      >
        <input
          className={`${theme?.color} `}
          type={"text"}
          placeholder={placeholder}
          name={name}
          disabled={readOnly}
          value={value?.replace("#", "")}
          autoComplete="false"
          onChange={({ target }) => handleChnage(`#${target?.value}`)}
        />
        <div
          style={{
            background: value,
          }}
          onClick={() => setTogglePicker(!togglePicker)}
          className={`${styles.colorView} ${theme?.bord20}`}
        />

        {togglePicker && (
          <div className={styles.picker} data-color-mode={theme?.name}>
            <Sketch
              className={theme.bord20}
              style={{ marginLeft: 20 }}
              color={value}
              onChange={(color) => handleChnage(color.hex)}
            />
          </div>
        )}
      </div>
      <ErrorMessage theme={theme} message={error} label={label}/>
    </label>
  );
};

export default ColorPicker;

// <div data-color-mode={theme?.name}>
//   <Sketch
//     className={theme.bord20}
//     style={{ marginLeft: 20 }}
//     color={value}
//     onChange={(color) => handleChnage(color.hex)}
//   />
// </div>
