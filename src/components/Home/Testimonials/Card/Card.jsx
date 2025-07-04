import Img from "@/components/Shared/img/Img";
import styles from "./Card.module.css";

const Card = ({ item, isActive }) => {
  if (!item) return null;

  return (
    <SpeechBubble>
      <div
        className={`${styles.card} flex column gap20 just-c ${
          isActive ? styles.active : styles.inactive
        }`}
      >
        <div className={styles.author}>
          <Img
            url={item?.poster?.url}
            alt={item?.author}
            className={styles.avatar}
          />
          <div>
            <p className={styles.name}>{item?.author}</p>
            <p className={styles.title}>{item?.jobTitle}</p>
          </div>
        </div>
        <p className={styles.quote}>“{item?.content}”</p>
      </div>
    </SpeechBubble>
  );
};

const SpeechBubble = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {children}

        <div className={styles.tail}></div>
      </div>
      {/* Define clip-path inside the component */}
      <svg width="0" height="0">
        <clipPath id="bubbleClip" clipPathUnits="objectBoundingBox">
          <path d="M0.1,0.9 C0.01,0.8, 0.04,0.2, 0.1,0.1 C0.2,0, 0.8,0, 0.9,0.1 C1,0.2, 1,0.8, 0.9,0.9 C0.8,1, 0.2,1, 0.1,0.9 C0.04,0.85, 0.05,0.65, 0.05,0.6 Z" />
        </clipPath>
      </svg>
    </div>
  );
};

export default Card;
