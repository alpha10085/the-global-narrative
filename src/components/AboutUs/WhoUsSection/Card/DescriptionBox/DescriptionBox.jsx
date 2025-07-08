"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./DescriptionBox.module.css";
import { lineBreak } from "@/utils/text";
import { scrollToElement } from "@/utils/document";
import { delay } from "@/utils/time";

const DescriptionBox = ({ CardKey = "", description = "" }) => {
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
      }, 300); // match fade duration
    }
  }, [expanded, lines]);


  const effectHandler = async () => {
    if (!expanded) {
      setExpanded(true)
    } else {
      setExpanded(false)
    }
  }
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
        {lines?.map((val, i) => {
          const alwaysVisible = i < 2;
          const isVisible = alwaysVisible || showExtra;
          const delay = isVisible && i >= 2 ? `${(i - 2) * 0.2}s` : "0s";

          return (
            <p
              key={i}
              className="description-sm"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `0.6s ease ${delay}`,
                margin: "30px 0",
                overflow: "hidden",
              }}
            >
              {val}
            </p>
          );
        })}
      </div>

      {lines.length > 2 && (
        <div className={styles.btn} onClick={effectHandler}>
          {expanded ? "show less" : "show more"}
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
