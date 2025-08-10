"use client";
import { useState } from "react";
import styles from "./style.module.css";
const page = () => {
  const [throwError, setThrowError] = useState(false);
  const handler = () => setThrowError(true);
  if (throwError) {
    throw new Error("can't take this action right now...");
  }
  return (
    <div className={`${styles.page} flex-c `}>
      <button onClick={handler}>Click me</button>
    </div>
  );
};

export default page;
