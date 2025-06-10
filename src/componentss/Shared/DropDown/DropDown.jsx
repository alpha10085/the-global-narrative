import { useEffect, useState } from "react";
import styles from "./DropDown.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const DropDown = ({
  className = "",
  options = [],
  placeholder = "select an option",
  currentValue,
  callBack,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`${className} ${styles.dropDown}`}
      open={open}
    >
      {currentValue ? (
        <h1 className={styles.title}>{currentValue}</h1>
      ) : (
        <h1 className={styles.placeholder}>{placeholder}</h1>
      )}
      <div open={open} className={styles.icon}>
        <ArrowBackIosNewIcon />
      </div>
      {open ? (
        <ul className={styles.options}>
          {options?.map((item, index) => (
            <li
              className={`${styles.option} showSmooth`}
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
