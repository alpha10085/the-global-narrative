"use client";
import React from "react";
import styles from "./InsightsTable.module.css";
import FilterBar from "../../FilterBar/FilterBar";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { getCountryCode, getDeviceInfo, getOSInfo } from "../../chartConfig";

const InsightsTable = ({
  headerLabels = {
    vistor: "vistors",
    main: "page views",
  },
  data = [],
  type,
}) => {
  const { theme } = useTheme();
  const chartDataArr = data?.data || [];
  console.log("🚀 ~ chartDataArr:", chartDataArr);

  return (
    <div
      className={`${styles.tableWrapper} ${theme.scrollBar} ${theme.background} ${theme.color} ${theme.bord20} showSmooth`}
    >
      <div className={styles.tableScrollX}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{headerLabels?.main}</th>
              <th style={{ textAlign: "center" }}>{headerLabels?.vistor}</th>
            </tr>
          </thead>
          <tbody>
            {chartDataArr?.map((val) => {
              const id = val?._id || "Unknown";
              const count = val?.count || 0;

              return (
                <tr
                  key={id + count}
                  className={`${theme.bg200} ${theme.bord20} ${
                    theme.name === "light" ? styles.light : styles.dark
                  }`}
                >
                  <td className={styles.countryCell}>
                    {type === "country" ? (
                      <span className={styles.flagWrapper}>
                        {getCountryCode(id) !== "unknown" ? (
                          <img
                            src={`https://flagcdn.com/24x18/${getCountryCode(
                              id
                            ).toLowerCase()}.png`}
                            alt={id}
                            className={styles.flagIcon}
                          />
                        ) : (
                          <span className={styles.flagPlaceholder}>🏳️</span>
                        )}
                        <span>{id}</span>
                      </span>
                    ) : type === "devices" ? (
                      <span className={styles.flagWrapper}>
                        <span className={styles.flagPlaceholder}>
                          {getDeviceInfo(id).icon}
                        </span>
                        <span>{getDeviceInfo(id).label}</span>
                      </span>
                    ) : type === "operating-systems" ? (
                      <span className={styles.flagWrapper}>
                        <span className={styles.iconWrapper}>
                          {getOSInfo(id).icon}
                        </span>
                        <span>{getOSInfo(id).label}</span>
                      </span>
                    ) : (

                      <span>{id}</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>{count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsightsTable;
