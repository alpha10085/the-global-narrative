"use client";

import { motion } from "framer-motion";
import styles from "./WordPullUpV2.module.css";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { delay as delayAction } from "@/utils/time";

export default function WordPullUpV2({
  text = "",
  delay = 0,
  className,
  triggerOnce = true,
  threshold = 0.1,
  duration = 0.4,
  options = {},
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
    <h1
      {...options}
      ref={ref}
      className={`${styles.WordPullUpV2} ${className || ""} flex wrap `}
    >
      {words?.map((word, i) => (
        <span key={i} className={`${styles.wordWrapper} `}>
          <motion.span
            initial={{ y: "100%" }}
            animate={
              visible ? { y: "0%", opacity: 1 } : { y: "100%" }
            }
            transition={{ duration, ease: "easeOut" }}
            className={styles.word}
          >
            {/^\s+$/.test(word) ? "" : word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
