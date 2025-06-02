"use client";

import { motion } from "framer-motion";
import styles from "./WordPullUpV3.module.css";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { delay as delayAction } from "@/utils/time";

export default function WordPullUpV3({
  text = "",
  delay = 0,
  className,
  triggerOnce = true,
  threshold = 0.1,
  duration = 0.4,
}) {
  const [visible, setVisible] = useState(false);
  const words = text?.match(/\S+|\s+/g) || [];

  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
    onChange: async (inView) => {
      if (inView) {
        await delayAction(delay);
        setVisible(true);
      } else {
        setVisible(false);
      }
    },
  });

  return (
    <h1 ref={ref} className={`${styles.WordPullUpV2} ${className || ""}`}>
      {words.map((word, i) => (
        <span key={i} className={styles.wordWrapper}>
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={visible ? { 
              y: [50, 0],
              opacity: 1 
            } : { y: "100%", opacity: 0 }}
            transition={{
              duration,
              ease: "easeOut",
              times: [0, 1],
            }}
            className={styles.word}
          >
            {/^\s+$/.test(word) ? <span>&nbsp;</span> : word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}