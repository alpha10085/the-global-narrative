"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useMotionValue, useSpring } from "framer-motion";
import classNames from "classnames";
import styles from "./DownCounter.module.css";

const DownCounter = ({
  active = false,
  value,
  direction = "up",
  delay = 0,
  className,
}) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
    }
  }, [motionValue, inView, delay, value, direction]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Intl.NumberFormat("en-US").format(
          Number(latest.toFixed(0))
        )}`;
      }
    });
  }, [springValue]);

  return (
    <span
      className={classNames(styles.numberTicker, className)}
      ref={(node) => {
        ref.current = node;
        inViewRef(node);
      }}
    />
  );
};

export default DownCounter;
