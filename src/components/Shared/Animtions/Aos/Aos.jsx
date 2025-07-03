"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { delay } from "@/utils/time";

const Aos = ({
  className = "",
  activeClassName = "",
  triggerOnce = true,
  threshold = 0.1,
  children,
  delay: animationDelay = 0,
  onClick,
  style = {},
}) => {
  const [event, setEvent] = useState(false);
  const { ref, inView } = useInView({ triggerOnce, threshold });

  useEffect(() => {
    let cancelled = false;

    const handle = async () => {
      if (inView) {
        if (animationDelay > 0) await delay(animationDelay);
        if (!cancelled) setEvent(true);
      } else if (!triggerOnce) {
        setEvent(false);
      }
    };

    handle();
    return () => {
      cancelled = true;
    };
  }, [inView, animationDelay, triggerOnce]);

  const handleClick = useCallback(onClick || (() => {}), [onClick]);

  const finalClassName = useMemo(() => {
    return `${className} ${event ? activeClassName : ""}`.trim();
  }, [className, activeClassName, event]);

  return (
    <div
      style={style}
      ref={ref}
      onClick={handleClick}
      className={finalClassName}
    >
      {children}
    </div>
  );
};

// ✅ Memoize the component itself to avoid unnecessary re-renders
export default React.memo(Aos);
