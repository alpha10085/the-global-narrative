"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./textRevealByWord.module.css";

const TextRevealByWord = ({ text, className }) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={`${styles.container} ${className}`}>
      <div className={styles.stickyContainer}>
        <p ref={targetRef} className={styles.text}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className={styles.wordContainer}>
      <span className={styles.absolute}>{children}</span>
      <motion.span style={{ opacity: opacity }} className={styles.textVisible}>
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
