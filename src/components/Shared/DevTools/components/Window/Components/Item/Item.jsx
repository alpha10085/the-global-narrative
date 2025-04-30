import { useState, useCallback, useEffect, useRef, memo } from "react";
import styles from "./Item.module.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useClickOut } from "@/hooks/useClickout";
import { delay } from "@/utils/delay";
import eventBus from "@/utils/eventBus";

const Item = ({ val, id, children, onFoucs, onUnFoucs, enabled = false }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const containerListRef = useRef(null);

  const handleOpen = useCallback(async () => {
    setIsHidden(false);
    await delay(150);
    setIsEnabled(true);
  }, []);

  const handleClose = useCallback(async (cb) => {
    setIsEnabled(false);
    cb?.();
    await delay(600);
    setIsHidden(true);
  }, []);

  const handleToggle = async () => {
    const nextState = !isEnabled;
    if (nextState) {
      await handleOpen();
      onFoucs(nextState);
    } else {
      await handleClose(() => onFoucs(nextState));
    }
  };

  const { ref } = useClickOut({
    onClickOutside: async () => {
      await delay(200);
      await handleClose(() => onUnFoucs?.());
    },
  });

  const scrollToElement = useCallback((offsetTop = null) => {
    if (containerListRef.current && offsetTop) {
      containerListRef.current.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    eventBus.on(id, scrollToElement);
    return () => eventBus.off(id, scrollToElement);
  }, [id, scrollToElement]);

  return (
    <div
      ref={ref}
      id={id}
      className={`${styles.itemlist} ${isEnabled ? styles.open : ""}`}
    >
      <div
        onClick={handleToggle}
        className={`gap10 flex just-sb al-i-c clickable ${styles.head}`}
      >
        <div className="flex gap10 al-i-c">
          <div className={`${styles.icon} flex-c`}>{val?.Icon}</div>
          <span>{val?.label}</span>
        </div>
        <span className={styles.arrowIcon}>
          <KeyboardArrowRightIcon />
        </span>
      </div>

      <div
        ref={containerListRef}
        className={`${styles.wrapper} ${isEnabled ? styles.show : ""}`}
      >
        {!isHidden && children}
      </div>
    </div>
  );
};

export default memo(Item, (prevProps, nextProps) => {
  return prevProps?.id === nextProps?.id;
});
