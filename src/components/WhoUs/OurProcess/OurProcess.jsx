"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./OurProcess.module.css";
import ShadowBg from "@/components/ShadowBg/ShadowBg";
import WordDisplay from "@/components/Shared/Animtions/WordRotate/WordRotate";
import GetInTouchButton from "@/components/Home/GetInTouchButton/GetInTouchButton";

const OurProcess = ({ data = {} }) => {
  const { title = "", description = "", steps = [] } = data;
  const [visibleIndex, setVisibleIndex] = useState(0);

  return (
    <div className={styles.scrollWrapper}>
      <div className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>{title}</h2>
            <p>{description}</p>
            <ShadowBg
              className={styles.ShadowBg}
              width={`50vw`}
              fullWidth={false}
              color="white"
            />
          </div>

          {steps?.map((step, index) => {
            const { ref, inView } = useInView({
              threshold: 0.3,
              onChange: (visible) => {
                if (visible) setVisibleIndex(index);
              },
            });

            return (
              <section
                key={step?._id}
                ref={ref}
                className={`${styles.section} ${index === 0 ? "" : ""}  ${
                  index === visibleIndex ? styles.active : styles.hidden
                }`}
              >
                <div className={styles.content}>
                  <div className={styles.top}>
                    <div className={styles.text}>
                      <WordDisplay
                        text={step?.title}
                        className={styles.title}
                      />
                      <WordDisplay
                        text={step?.description}
                        className={styles.description}
                      />
                    </div>
                    <h1 className={styles.number}>{`0${index + 1}`}</h1>
                  </div>
                  <ul className={styles.list}>
                    {step?.points?.map((point, i) => (
                      <li key={i}>{point?.title}</li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>
        <div className={styles.link}>
          <h2>Ready to realize the idea</h2>
          <GetInTouchButton withShadow={false} className={styles.getIntouch} />
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
