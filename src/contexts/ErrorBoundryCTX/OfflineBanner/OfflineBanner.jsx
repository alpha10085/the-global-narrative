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
<div
  className={`${styles.offlineBanner} ${!enabled ? styles.hide : ""} flex-c column gap10`}
>
  <span className={`${styles.icon} flex-c`}>
    <WifiTetheringOffIcon />
  </span>
  <h1>Connection Issue</h1>
  <p>
    Your internet connection seems slow or offline. Some features might not work 
    properly until your connection improves.
  </p>
</div>
      )}
    </section>
  );
};

export default OfflineBanner;
