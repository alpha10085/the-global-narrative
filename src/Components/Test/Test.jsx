"use client";
import styles from "./Test.module.css";
const Test = () => {
  const throwError = () => {
    
    
  };
  return (
    <button onClick={throwError} className={styles.button}>
      throw Error
    </button>
  );
};

export default Test;
