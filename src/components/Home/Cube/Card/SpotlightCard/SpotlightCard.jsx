"use client";
import { useRef, useState } from "react";
import clsx from "clsx";
import styles from "./SpotlightCard.module.css";

const SpotlightCard = ({ text = "", className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) => {
  const ref = useRef(null);
  const [coords, setCoords] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={clsx(styles.container, className)}
    >
      <div
        className={styles.spotlight}
        style={{
          background: `radial-gradient(circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default SpotlightCard;
