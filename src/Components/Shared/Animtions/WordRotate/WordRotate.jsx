"use client";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./WordRotate.module.css";
import { delay } from "@/utils/time";

const WordDisplay = ({ delayShow = 0, text, className, animationdelay = 0 }) => {  
  const [inView, setEvent] = useState(false)
  const { ref } = useInView({
    threshold: 0.2,
    triggerOnce: true,
    onChange: async (condition) => {
      if (condition) {
        await delay(delayShow)
        setEvent(true)
      }
    }
  });

  return (
    <div ref={ref} className={`${styles.wordDisplay} ${className}`}>
      <h1 className={className}>

        {inView ? text?.split(" ").map((word, index) => (
          <span
            key={index}
            className={`${styles.inView}`}
            style={{ animationDelay: `${index * (animationdelay / 100)}s` }}
          >
            {word}
          </span>
        )) : text?.split(" ")?.map((word, index) => (
          <span
            key={`${index}-hidden`}
            className={``}
            style={{
              opacity: "0"
            }}
          >
            {word}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default WordDisplay;
