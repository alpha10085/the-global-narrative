"use client";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import styles from "./StaticSection.module.css";
import { useEffect, useState } from "react";
import eventBus from "@/utils/eventBus";
const StaticSection = ({ mode = "up" }) => {
  const { isInside, sectionRef } = useSectionObserver({
    threshold: 0.2,
  });

  useEffect(() => {
    if (isInside) {
      eventBus.emit("StaticSection", mode === "up");
    }
  }, [isInside]);

  return <div ref={sectionRef}></div>;
};

export default StaticSection;

export const CSRSection = ({ children }) => {
  const [event, setEvent] = useState(true);

  const handler = (state) => setEvent(state);
  useEffect(() => {
    eventBus.on("StaticSection", handler);

    return () => {
      eventBus.off("StaticSection", handler);
    };
  }, []);

  return (
    <div
      className={`${styles.staticContainer} ${
        event ? styles.active : styles.unActive
      }`}
    >
      {children}
    </div>
  );
};
