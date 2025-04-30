import styles from "./FallBackCards.module.css";

import Skeleton from "@/components/Shared/Skeleton/skeleton";

const FallBackCards = ({ length=6 }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.fallBack}>
        {Array?.from({ length }).map((val, i) => (
          <div key={i} className={`${styles.card} showSmooth`}>
            <Skeleton className={styles.skPoster} />
            <div className={`${styles.bottom} flex  column just-sb `}>
              <Skeleton className={styles.skCradDesc} />
              <Skeleton className={styles.skCradTitle} />
            </div>
          </div>
        ))}
      </div></div>
  );
};
export default FallBackCards;
