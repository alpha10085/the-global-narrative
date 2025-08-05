"use client";
import { useInView } from "react-intersection-observer";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import styles from "./TemplateHero.module.css";
import Threads from "@/components/Threads/Threads";
const TemplateHero = ({ pageTitle = "..." }) => {
  const { ref: bgRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <div className={styles.staticWrapper}>
      <div className={`${styles.container} showSmooth flex gap50`}>
        <div className={styles.bg} ref={bgRef}>
          {inView && (
            <Threads
              color="#add8e6"
              amplitude={2.5}
              distance={0.2}
              fade={1.2}
              className={`${styles.canvas} showSmooth`}
            />
          )}
        </div>

        <WordPullUpV2
          duration={0.4}
          delay={400}
          text={pageTitle}
          className={styles.title}
        />
      </div>
    </div>
  );
};

export default TemplateHero;
