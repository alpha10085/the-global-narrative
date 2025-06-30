"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./FAQItem.module.css";

const FAQItem = ({ question, answer, animationDelay = 0 }) => {
  const [open, setOpen] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    delay: animationDelay,
  });

  return (
    <details
      ref={ref}
      className={`${styles.faqItem} ${open ? styles.open : ""} ${
        inView ? styles.faqActive : ""
      }`}
      open={open}
      onToggle={() => setOpen(!open)}
      style={{
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      <summary>
        {question}
        <ExpandMoreIcon className={styles.icon} />
      </summary>
      <div className={styles.faqAnswer}>{answer}</div>
    </details>
  );
};

export default FAQItem;
