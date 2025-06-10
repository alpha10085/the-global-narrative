import { useState } from "react";
import styles from "./Booleaninput.module.css";

const BooleanInput = ({ theme, callback, show = true }) => {
  const [state, setState] = useState("null");
  const handleClick = (val) => {
    callback(val);
    setState(val);
  };

  if (!show) return;
  return (
    <div
      className={`${styles.body}  flex just-sb al-i-c ${theme?.background} ${theme?.bord20} input`}
    >
      <div onClick={() => handleClick(true)} className={styles.text}>
        yes
      </div>
      <div className={`${styles?.state} ${styles[state]}`}></div>
      <div onClick={() => handleClick(false)} className={styles.text}>
        no
      </div>
    </div>
  );
};

export default BooleanInput;
