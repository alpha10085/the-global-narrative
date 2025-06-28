"use client";
import React from "react";
import styles from "./InsightsTable.module.css";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import TypeRenderer from "./TypeRenderer/TypeRenderer";

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
            {chartDataArr.map((val) => {
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
                    <TypeRenderer id={id} type={type} />
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
