"use client";
import { useEffect, useState } from "react";
import styles from "./Quote.module.css";
import TextRevealByWord from "@/components/Shared/Animtions/TextRevealByWord/TextRevealByWord";
import WordDisplay from "@/components/Shared/Animtions/WordRotate/WordRotate";
import WordFadeIn from "@/components/Shared/Animtions/WordFadeIn/WordFadeIn";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
function splitContentToLines(content) {
  return content
    .split("\n") // Split by newline
    .map((line) => line.trim()) // Remove leading/trailing spaces
    .filter((line) => line); // Remove empty lines
}

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
  const lines = splitContentToLines(data?.content);

  return (
    <div className={styles.container}>
      {/* <div className={`${styles.main} flex column just-sb`}>
        {Array.from({ length: 11 }).map((_, lineIndex) => (
          <LinePFPoints
            key={lineIndex}
            lineIndex={lineIndex}
            activeNumbers={numbers}
          />
        ))}
      </div> */}

      <div className={`${styles.content} flex column`}>
        {lines.slice(0, lines?.length - 1)?.map((val, i) => (
          <Aos
            key={i}
            className={styles.line}
            activeClassName={styles.active}
            triggerOnce={false}
            threshold={1}
          >
            <h1 className={styles.text}>{val}</h1>
          </Aos>
        ))}

         <Aos
            key={lines?.length - 1}
            className={`${styles.line} `}
            activeClassName={styles.active}
            triggerOnce={false}
            threshold={1}
          >
            <h1 className={styles.text}>{lines[lines?.length - 1]}</h1>
          </Aos>
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
