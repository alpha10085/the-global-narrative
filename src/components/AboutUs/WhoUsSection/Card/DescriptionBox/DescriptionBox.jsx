"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./DescriptionBox.module.css";
import { lineBreak } from "@/utils/text";

const DescriptionBox = ({ description = "" }) => {
  const [expanded, setExpanded] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [height, setHeight] = useState("auto");

  const fullRef = useRef(null);
  const previewRef = useRef(null);

  const lines = lineBreak(description, ["."]);

  useEffect(() => {
    if (!lines.length || !fullRef.current || !previewRef.current) return;

    const fullHeight = fullRef.current.scrollHeight;
    const previewHeight = previewRef.current.scrollHeight;

    if (expanded) {
      setHeight(fullHeight);
      setShowExtra(true);
    } else {
      // fade out first, then collapse
      setShowExtra(false);
      setTimeout(() => {
        setHeight(previewHeight);
      }, 600); // match fade duration
    }
  }, [expanded, lines]);

  return (
    <div className={styles.container}>
      {/* Hidden height refs */}
      <div className={styles.hiddenHeights}>
        <div ref={fullRef}>
          {lines.map((val, i) => (
            <p key={i} className="description-sm">
              {val}
            </p>
          ))}
        </div>
        <div ref={previewRef}>
          {lines.slice(0, 2).map((val, i) => (
            <p key={i} className="description-sm">
              {val}
            </p>
          ))}
        </div>
      </div>

      {/* Animated box */}
      <div className={styles.descriptionBox} style={{ height }}>
        {lines.map((val, i) => {
          const alwaysVisible = i < 2;
          const isVisible = alwaysVisible || showExtra;
          const delay = isVisible && i >= 2 ? `${(i - 2) * 0.2}s` : "0s";

          return (
            <p
              key={i}
              className="description-sm"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}`,
                // height: isVisible ? "auto" : 0,
                margin: isVisible ? "10px 0" : 0,
                overflow: "hidden",
              }}
            >
              {val}
            </p>
          );
        })}
      </div>

      {lines.length > 2 && (
        <div className={styles.btn} onClick={() => setExpanded(!expanded)}>
          {expanded ? "show less" : "show more..."}
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
