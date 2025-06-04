"use client";
import styles from "./Test.module.css";
const Test = () => {
  const throwError = () => {
    
    console.log(hi);
    
  };
  return (
    <button onClick={throwError} className={styles.button}>
      throw Error
    </button>
  );
};

export default Test;
