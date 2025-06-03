"use client";
import { useEffect, useState } from "react";
import styles from "./dropdown.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useClickOut } from "@/hooks/useClickout";
import ErrorMessage from "@/_Dashboard/_Components/ErrorMessage/ErrorMessage";
import { searchAndReplace } from "@/utils/text";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";
import useDynamicState from "@/hooks/useDynamicState";

const DropDown = ({
  onChange = () => "",
  show = true,
  theme,
  className = "",
  field = {},
  currentValue = "",
  error = null,
}) => {
  const { options = [], name, placeholder = "Select" } = field;

  const [state, setState] = useDynamicState({
    value: currentValue
      ? options?.find((val) => val?.value === currentValue)?.label ||
        currentValue
      : undefined,
    toggleDropDown: false,
  });

  const { ref } = useClickOut({
    onClickOutside: () =>
      setState({
        toggleDropDown: false,
      }),
  });

  const handleChange = (item) => {
    if (!item.label || !item.value) return;
    onChange(name, item?.value);
    setState({
      value: item?.label,
      toggleDropDown: false,
    });
  };

  return (
    <label
      ref={ref}
      open={state.toggleDropDown}
      id={handleReplaceDot(field?.name)}
      className={`flex column showSmooth ${styles.label} ${className}`}
    >
      <h1 className={styles.title}>{field?.label}</h1>
      <div
        onClick={() => setState({ toggleDropDown: true })}
        className={`${theme?.background} ${theme?.bord20}  flex  just-sb ${styles.dropDown}`}
      >
        {state.value ? (
          <h1 className={styles.value}>{state.value}</h1>
        ) : (
          <h1 className={styles.placeholder}> {placeholder}</h1>
        )}
        <div className={styles.icon}>
          {!!options?.length && <ArrowBackIosNewIcon />}
        </div>
      </div>
      {state.toggleDropDown && !!options?.length ? (
        <ul
          className={`${styles.options} ${theme?.background} ${theme?.bord20}`}
        >
          {options?.map((item, index) => (
            <li
              style={{
                animationDelay: `${0.2 * index}s`,
              
              }}
              className={`${styles?.option} `}
              key={index}
              onClick={() => handleChange(item)}
            >
              {item?.label}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
      <ErrorMessage theme={theme} message={error} />
    </label>
  );
};

export default DropDown;
