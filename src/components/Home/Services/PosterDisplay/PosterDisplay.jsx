import { useEffect, useState } from "react";
import styles from "./PosterDisplay.module.css";
import Img from "@/components/Shared/img/Img";

const PosterDisplay = ({ activePoster }) => {
  const [prev, setPrev] = useState(null);
  const [current, setCurrent] = useState(activePoster);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (!activePoster || activePoster?._id === current?._id) return;

    // Save current as prev before updating
    setPrev(current);
    setFadeIn(false);

    // Wait before updating current poster to allow prev to animate out
    const timeout = setTimeout(() => {
      setCurrent(activePoster);
      setFadeIn(true);
      setPrev(null); // clean after fade-in
    }, 200);

    return () => clearTimeout(timeout);
  }, [activePoster]);

  return (
    <div className={styles.posterBox}>
      {prev && (
        <div className={`${styles.posterWrapper} ${styles.exit}`}>
          <Img
            url={prev?.url}
            alt="Previous Poster"
            className={styles.posterImage}
            mainClassName=""
            disableSkeleton={true}
            withEffect={false}
          />
        </div>
      )}
      {current && (
        <div
          className={`${styles.posterWrapper} ${
            fadeIn ? styles.enter : styles.hidden
          }`}
        >
          <Img
            url={current?.url}
            alt="Current Poster"
            className={styles.posterImage}
            mainClassName=""
            disableSkeleton={true}
            withEffect={false}
          />
        </div>
      )}
    </div>
  );
};

export default PosterDisplay;
