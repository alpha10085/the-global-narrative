"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./DescriptionBox.module.css";
import { lineBreak } from "@/utils/text";

const DescriptionBox = ({ description = "" }) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const [showExtra, setShowExtra] = useState(false);

  const boxRef = useRef(null);
  const fullRef = useRef(null);
  const previewRef = useRef(null);

  const lines = lineBreak(description, ["."]);

  const getHeightFromRef = (ref) => {
    if (!ref.current) return 0;
    const children = Array.from(ref.current.children);
    if (children.length === 0) return 0;

    const first = children[0];
    const last = children[children.length - 1];

    const top = first.offsetTop;
    const bottom = last.offsetTop + last.offsetHeight;

    return bottom - top;
  };

  const updateHeight = () => {
    const fullHeight = getHeightFromRef(fullRef);
    const previewHeight = getHeightFromRef(previewRef);
    setHeight(expanded ? fullHeight : previewHeight);
  };

  useEffect(() => {
    updateHeight();
  }, [expanded, lines]);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const handleTransitionEnd = () => {
      if (expanded) setShowExtra(true);
      else setShowExtra(false);
    };

    el.addEventListener("transitionend", handleTransitionEnd);
    return () => el.removeEventListener("transitionend", handleTransitionEnd);
  }, [expanded]);

  const toggleExpand = () => {
    if (expanded) setShowExtra(false);
    setExpanded((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      {/* Hidden refs */}
      <div className={styles.hiddenHeights}>
        <div ref={fullRef} className={styles.heightsInner}>
          {lines.map((val, i) => (
            <p key={i} className="description-sm">
              {val}
            </p>
          ))}
        </div>
        <div ref={previewRef} className={styles.heightsInner}>
          {lines.slice(0, 2).map((val, i) => (
            <p key={i} className="description-sm">
              {val}
            </p>
          ))}
        </div>
      </div>

      {/* Visible Description */}
      <div ref={boxRef} className={styles.descriptionBox} style={{ height }}>
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
                transition: `opacity 0.6s ease ${delay}`,
              }}
            >
              {val}
            </p>
          );
        })}
      </div>

      {lines.length > 2 && (
        <div className={styles.btn} onClick={toggleExpand}>
          {expanded ? "show less" : "show more"}
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
