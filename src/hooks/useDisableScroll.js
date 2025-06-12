import eventBus from "@/utils/eventBus";
import { delay } from "@/utils/time";
import { useEffect, useRef } from "react";

const scrollLockCounter = { count: 0 };

const updateScrollLock = (lock) => {
  if (lock) {
    if (scrollLockCounter.count === 0) {
      document.body.style.overflow = "hidden";
      eventBus.emit("lenis", false);
    }
    scrollLockCounter.count += 1;
  } else {
    scrollLockCounter.count = Math.max(0, scrollLockCounter.count - 1);
    if (scrollLockCounter.count === 0) {
      document.body.style.overflow = "";
      eventBus.emit("lenis", true);
    }
  }
};

const useDisableScroll = ({ default: disable = true }) => {
  const isLockedRef = useRef(false);

  useEffect(() => {
    if (disable) {
      isLockedRef.current = true;
      delay(0).then(() => {
        updateScrollLock(true);
      });
    } else {
      isLockedRef.current = false;
      updateScrollLock(false);
    }

    return () => {
      if (isLockedRef.current) {
        isLockedRef.current = false;
        updateScrollLock(false);
      }
    };
  }, [disable]);

  const toggleScroll = () => {
    isLockedRef.current = !isLockedRef.current;
    updateScrollLock(isLockedRef.current);
  };
  const disableScroll = () => {
    isLockedRef.current = true;
    updateScrollLock(isLockedRef.current);
  };
  const enableScroll = () => {
    isLockedRef.current = false;
    updateScrollLock(isLockedRef.current);
  };

  return {
    toggleScroll,
    disableScroll,
    enableScroll,
  };
};

export default useDisableScroll;
