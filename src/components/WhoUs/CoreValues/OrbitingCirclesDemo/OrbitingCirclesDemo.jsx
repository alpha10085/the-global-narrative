import React from "react";
import styles from "./OrbitingCirclesDemo.module.css";
import { handleReplaceDot } from "@/utils/text";
import { scrollToElement } from "@/utils/document";
import Img from "@/components/Shared/img/Img";

export function OrbitingCirclesDemo({ data = {}, activeIndex = 0 }) {
  const splitArray = (arr) => {
    const mid = Math.ceil(arr.length / 2); // Find the middle index
    const firstHalf = arr.slice(0, mid); // First half of the array
    const secondHalf = arr.slice(mid); // Second half of the array

    return [firstHalf, secondHalf];
  };

  const [firstHalf, secondHalf] = splitArray(data?.points || []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Large Circle */}
        <OrbitingCircles
          reverse={false}
          iconSize={65}
          radius={250}
          activeIndex={activeIndex}
          items={firstHalf} // First 3 items
        />

        {/* Inner Smaller Circle */}
        <div className={styles.inner}>
          <OrbitingCircles
            iconSize={65}
            reverse={true}
            radius={170}
            activeIndex={activeIndex}
            items={secondHalf} // Remaining items
          />
        </div>
      </div>
    </div>
  );
}

export function OrbitingCircles({
  items = [],
  reverse = false,
  duration = 20,
  radius = 160,
  iconSize = 30,
  activeIndex = 0,
  group = 1,
}) {
  const totalItems = items.length;
  const rotationClass = reverse
    ? styles.reverseRotation
    : styles.forwardRotation;

  return (
    <div
      className={`${rotationClass} ${styles.orbitContainer}`}
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDuration: `${duration}s`,
      }}
    >
      {items?.reverse().map((value, index) => {
        const angle = (360 / totalItems) * index;

        return (
          <div
            key={value?._id}
            className={`${styles.orbitItem} ${
              value?._id === activeIndex ? styles.activeCircle : ""
            }`}
            onClick={() => {
              scrollToElement(`#id_${value?._id}`, 120);
            }}
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
            }}
          >
            <Img theme="dark" className={styles.logo} url={value?.logo?.url} />
          </div>
        );
      })}
    </div>
  );
}
