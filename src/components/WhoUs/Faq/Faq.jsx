"use client";
import { useState } from "react";
import styles from "./Faq.module.css";
import { FaPlus, FaTimes } from "./icons";
import SectionHead from "@/components/Home/SectionHead/SectionHead";
import Aos from "@/components/Shared/Animtions/Aos/Aos";

const Faq = ({data = []}) => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleFaq = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <SectionHead delay={200} title={"FAQ"} />

      <div className={styles.faqList}>
        {data?.map((faq, index) => (
          <Aos
            key={index}
            className={styles.faqItem}
            activeClassName={styles.faqItemVisible} 
            delay={index * 100} 
          >
            <div
              className={`${
                openQuestion === index && faq?.answer ? styles.activeQ : ""
              }`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFaq(index)}
              >
                <span>{faq?.question}</span>
                {openQuestion === index ? (
                  <div className={styles.iconActive}>
                    <FaTimes />
                  </div>
                ) : (
                  <div className={styles.icon}>
                    <FaPlus />
                  </div>
                )}
              </button>
              <div
                className={`${styles.faqAnswer} ${
                  openQuestion === index ? styles.showAnswer : styles.hideAnswer
                }`}
              >
                <p>{faq?.answer}</p>
              </div>
            </div>
          </Aos>
        ))}
      </div>
    </div>
  );
};

export default Faq;
