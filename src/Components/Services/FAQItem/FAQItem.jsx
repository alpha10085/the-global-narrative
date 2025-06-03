"use client"
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import styles from "./FAQItem.module.css"

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <details
      className={`${styles.faqItem} ${open ? styles.open : ''}`}
      open={open}
      onToggle={() => setOpen(!open)}
    >
      <summary>
        {question}
        <ExpandMoreIcon className={styles.icon} />
      </summary>
      <div className={styles.faqAnswer}>{answer}</div>
    </details>
  );
};

export default FAQItem