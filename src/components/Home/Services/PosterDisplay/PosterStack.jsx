"use client";
import styles from "./PosterStack.module.css";
import Img from "@/components/Shared/img/Img";
import { useRef } from "react";

const PosterStack = ({ activeIndex = 0, posters = [] }) => {
  return (
    <div className={styles.cards}>
      {posters?.map((poster, index) => {
        const isActive = activeIndex === index;
        const isBefore = activeIndex > index;
        const isAfter = activeIndex < index;

        const dynamicWidth = isAfter ? `calc(100% - ${index * 5}%)` : "100%";

        return (
          <div
            key={poster?._id}
            className={`${styles.card} 
              ${isActive ? styles.activeIndex : ""} 
              ${isBefore ? styles.lessThanActiveIndex : ""} 
              ${isAfter ? styles.moreThanactiveIndex : ""}
            `}
            style={{
              paddingTop: `${20 + (posters?.length - 1 - index) * 20}px`,
              zIndex: posters?.length - 1 - index,
              ...(!isBefore
                ? {
                    transform: `translateY(${
                      10 + (posters?.length - 1 - index) * 10
                    }px)`,
                  }
                : {}),
            }}
          >
            <div className={styles.cardInner} style={{
              height:dynamicWidth,
              width: dynamicWidth }}>
              <Img className={styles.cardImage} url={poster?.url} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PosterStack;
