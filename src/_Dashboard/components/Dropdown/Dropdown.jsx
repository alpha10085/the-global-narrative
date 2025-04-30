"use client";
import { useEffect, useState } from "react";
import styles from "./dropdown.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useClickOut } from "@/hooks/useClickout";

const DropDown = ({
  className = "",
  options = [],
  placeholder = "select an a option",
  currentValue,
  callBack = () => {},
  show = true,
  theme,
}) => {
  const [open, setOpen] = useState(false);
  const { ref } = useClickOut({ onClickOutside: () => setOpen(false) });
  if (!show) return;

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`${theme?.background} ${theme?.bord20} ${className} ${styles.dropDown}`}
      open={open}
      ref={ref}
    >
      {currentValue ? (
        <h1 className={styles.title}>{currentValue}</h1>
      ) : (
        <h1 className={styles.placeholder}> {placeholder}</h1>
      )}
      <div open={open} className={styles.icon}>
        {!!options?.length && <ArrowBackIosNewIcon />}
      </div>
      {open && !!options?.length ? (
        <ul
          className={`${styles.options} ${theme?.background} ${theme?.bord20}`}
        >
          {options?.map((item, index) => (
            <li
              className={`${styles.option} clickAble showSmooth`}
              key={index}
              onClick={() => callBack(item?.key)}
            >
              {item?.label}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default DropDown;
