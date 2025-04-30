"use client";

import { motion } from "framer-motion";
import styles from "./WordPullUp.module.css";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { delay as delayAction } from "@/utils/time";

export default function WordPullUp({
  text = "",
  delay = 0,
  className,
  triggerOnce = true,
  threshold = 0.1,
  children,
  duration = 0.1,
}) {
  const [visible, setVisible] = useState(false);
  const [visibleChild, setVisibleChild] = useState(false);
  const words = text?.match(/\S+|\s+/g) || [];

  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
    onChange: async (inView) => {
      if (inView) {
        await delayAction(delay);
        setVisible(true);
        await delayAction(words.length * (duration + 0.15) * 1000);
        setVisibleChild(true);
      } else {
        setVisible(false);
        setVisibleChild(false);
      }
    },
  });

  return (
    <>
      <motion.h1
        ref={ref}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        initial="hidden"
        animate={visible ? "show" : "hidden"}
        className={`${styles.wordPullUp} ${className || ""}`}
      >
        {words?.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { y: 70, opacity: 0 },
              show: {
                y: 0,
                opacity: 1,
                transition: { duration, ease: "easeInOut" },
              },
            }}
            className={styles.wordSpan}
          >
            {/^\s+$/.test(word) ? <span>&nbsp;</span> : word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        initial="hidden"
        animate={visibleChild ? "show" : "hidden"}
        variants={{
          hidden: { y: 70, opacity: 0 },
          show: {
            y: 0,
            opacity: 1,
            transition: { duration, ease: "easeInOut" },
          },
        }}
        className={styles.wordSpan}
      >
        {children}
      </motion.div>
    </>
  );
}
