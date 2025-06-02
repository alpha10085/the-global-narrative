"use client";
import { useEffect, useState } from "react";
import styles from "./OfflineBanner.module.css";
import { delay } from "@/utils/delay";
import WifiTetheringOffIcon from "@mui/icons-material/WifiTetheringOff";
const OfflineBanner = ({ children, enabled = false }) => {
  const [visible, setVisible] = useState(!enabled);

  useEffect(() => {
    const updateVisibility = async () => {
      await delay(400);
      setVisible(!enabled);
    };
    updateVisibility();
  }, [enabled]);

  return (
    <section className={styles.main}>
      {visible ? (
        <div className={`${styles.children} ${enabled ? styles.hide : ""}`}>
          {children}
        </div>
      ) : (
        <div className={`${styles.offlineBanner} ${!enabled ? styles.hide : ""} flex-c column gap10`}>
          <span className={`${styles.icon} flex-c`}>
            <WifiTetheringOffIcon />
          </span>
          <h1>You're Offline !</h1>
          <p>
            It looks like your internet connection was lost, Some features may
            not be available until you're back online.
          </p>
        </div>
      )}
    </section>
  );
};

export default OfflineBanner;
