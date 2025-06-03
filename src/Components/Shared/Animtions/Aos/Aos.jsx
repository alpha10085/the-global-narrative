"use client";

import { delay } from "@/utils/time";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const Aos = ({
  className = "",
  activeClassName = "",
  triggerOnce = true,
  threshold = 0.1,
  children,
  delay: animtionDelay = 0,
  onClick = () => {},
}) => {
  const [event, setEvent] = useState(false);
  const { ref, inView, entry } = useInView({
    triggerOnce,
    threshold,
    onChange: async (inView) => {
      if (inView) {
        await delay(animtionDelay);
        setEvent(true);
      } else {
        // Add your animation reverse logic here
        if (!triggerOnce) setEvent(false);
      }
    },
  });
  return (
    <div
      onClick={onClick}
      ref={ref}
      className={`${className} ${event && activeClassName}`}
    >
      {children}
    </div>
  );
};

export default Aos;
