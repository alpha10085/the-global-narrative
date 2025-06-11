"use client";
import { useEffect, useState } from "react";
import styles from "./Quote.module.css";
import TextRevealByWord from "@/components/Shared/Animtions/TextRevealByWord/TextRevealByWord";
import WordDisplay from "@/components/Shared/Animtions/WordRotate/WordRotate";
import WordFadeIn from "@/components/Shared/Animtions/WordFadeIn/WordFadeIn";

const Quote = ({ data = {} }) => {
  const [numbers, setNumbers] = useState([null, null]);

  useEffect(() => {
    const interval = setInterval(() => {
      let num1 = Math.floor(Math.random() * 352) + 1;
      let num2;

      do {
        num2 = Math.floor(Math.random() * 352) + 1;
      } while (num2 === num1);

      setNumbers([num1, num2]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.main} flex column just-sb`}>
        {Array.from({ length: 11 }).map((_, lineIndex) => (
          <LinePFPoints
            key={lineIndex}
            lineIndex={lineIndex}
            activeNumbers={numbers}
          />
        ))}
      </div>

      <div className={styles.content}>
        <WordFadeIn mode="dark" className={styles.text} text={data?.content} />
      </div>
    </div>
  );
};

const LinePFPoints = ({ lineIndex, activeNumbers }) => {
  return (
    <div className={`${styles.line} flex just-sb`}>
      {Array.from({ length: 32 }).map((_, pointIndex) => {
        const globalIndex = lineIndex * 32 + pointIndex;
        const isActive = activeNumbers.includes(globalIndex);
        return (
          <div
            key={pointIndex}
            className={`${styles.pointBg} ${isActive ? styles.active : ""}`}
          />
        );
      })}
    </div>
  );
};

export default Quote;
