// components/TypeRenderer.jsx
import React from "react";
import styles from "../InsightsTable.module.css";
import { getBrowserInfo, getCountryCode, getDeviceInfo, getOSInfo } from "../../../chartConfig";


const TypeRenderer = ({ id, type }) => {
  if (type === "country") {
    const code = getCountryCode(id);
    return (
      <span className={styles.flagWrapper}>
        {code !== "unknown" ? (
          <img
            src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
            alt={id}
            className={styles.flagIcon}
          />
        ) : (
          <span className={styles.flagPlaceholder}>🏳️</span>
        )}
        <span>{id}</span>
      </span>
    );
  }

  if (type === "devices") {
    const device = getDeviceInfo(id);
    return (
      <span className={styles.flagWrapper}>
        <span className={styles.flagPlaceholder}>{device.icon}</span>
        <span>{device.label}</span>
      </span>
    );
  }

  if (type === "operating-systems") {
    const os = getOSInfo(id);
    return (
      <span className={styles.flagWrapper}>
        <span className={styles.iconWrapper}>{os.icon}</span>
        <span>{os.label}</span>
      </span>
    );
  }

  if (type === "browsers") {
    const browser = getBrowserInfo(id);
    return (
      <span className={styles.flagWrapper}>
        <span className={styles.iconWrapper}>{browser.icon}</span>
        <span>{browser.label}</span>
      </span>
    );
  }

  return <span>{id}</span>;
};

export default TypeRenderer;
