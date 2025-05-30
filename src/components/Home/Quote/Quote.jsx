"use client";
import { useEffect, useState } from "react";
import styles from "./Quote.module.css";
import TextRevealByWord from "@/components/Shared/Animtions/TextRevealByWord/TextRevealByWord";
import WordDisplay from "@/components/Shared/Animtions/WordRotate/WordRotate";
import WordFadeIn from "@/components/Shared/Animtions/WordFadeIn/WordFadeIn";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import StaticSection from "../StaticSection/StaticSection";
function splitContentToLines(content) {
  return content
    .split("\n") // Split by newline
    .map((line) => line.trim()) // Remove leading/trailing spaces
    .filter((line) => line); // Remove empty lines
}

const Quote = ({ data = {} }) => {
  const lines = splitContentToLines(data?.content);

  return (
    <div className={styles.container}>
      <div className={`${styles.content} flex column`}>
        {lines?.slice(0, lines?.length - 3)?.map((val, i) => (
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
        <StaticSection />
        <Aos
          key={lines?.length - 3}
          className={`${styles.line} `}
          activeClassName={styles.active}
          triggerOnce={false}
          threshold={1}
        >
          <h1 className={styles.text}>{lines[lines?.length - 3]}</h1>
        </Aos>
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

export default Quote;
