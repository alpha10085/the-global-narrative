"use client";
import { useState } from "react";
import styles from "./Booleaninput.module.css";
import ErrorMessage from "@/_Dashboard/_Components/ErrorMessage/ErrorMessage";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";
import { useClickOut } from "@/hooks/useClickout";
const BooleanInput = ({
  onChange = () => "",
  show = true,
  theme,
  field = {},
  currentValue = null,
  error = null,
}) => {
  const [state, setState] = useState(currentValue);
  const [focus, setFocus] = useState(false);
  const { ref } = useClickOut({
    onClickOutside: () => setFocus(false),
  });
  const handleClick = (val) => {
    onChange(field?.name, val);
    setState(val);
  };

  if (!show) return;
  return (
    <div
      onClick={() => setFocus(true)}
      id={handleReplaceDot(field?.name)}
      className={`flex column  gap5  showSmooth `}
    >
      <h1 className={styles.title}>{field?.name}</h1>
      <div
        ref={ref}
        className={`${styles.body}   flex just-sb al-i-c ${theme?.background} ${
          theme?.bord20
        }   ${focus && theme.inputFocused} ${error && theme.inputError}`}
      >
        <div
          onClick={() => handleClick(true)}
          className={`${styles.text} flex-c`}
        >
          yes
        </div>
        <div className={`${styles?.state} ${styles[state]}`}></div>
        <div
          onClick={() => handleClick(false)}
          className={`${styles.text} flex-c`}
        >
          no
        </div>
      </div>
      <ErrorMessage theme={theme} message={error}  />
    </div>
  );
};

export default BooleanInput;
