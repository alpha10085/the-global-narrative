"use client";
import styles from "./PosterStack.module.css";
import Img from "@/components/Shared/img/Img";
import { useEffect, useRef } from "react";

const PosterStack = ({ posters = [] }) => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      cardsRef.current.forEach((card, index) => {
        const nextCard = cardsRef.current[index + 1];
        const cardInner = card.querySelector(`.${styles.cardInner}`);
        if (!nextCard || !cardInner) return;

        const rect = nextCard.getBoundingClientRect();
        const vh = window.innerHeight;

        const offsetTop = 20 + index * 20;
        const percentage = Math.min(
          1,
          Math.max(
            0,
            (vh - rect.top - offsetTop) / Math.max(100, vh - card.clientHeight)
          )
        );

        const scale = 1 - (posters?.length - 1 - index) * 0.1;
        const currentScale = 1 - (1 - scale) * percentage;
        const brightness = 1 - (1 - 0.6) * percentage;

        cardInner.style.transform = `scale(${currentScale})`;
        cardInner.style.filter = `brightness(${brightness})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [posters?.length]);

  return (
    <div className={styles.cards}>
      {posters?.map((poster, index) => (
        <div
          key={poster?._id}
          className={styles.card}
          ref={(el) => (cardsRef.current[index] = el)}
          style={{ paddingTop: `${20 + index * 20}px` }}
        >
          <div className={styles.cardInner}>
            <Img className={styles.cardImage} url={poster?.url} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PosterStack;
