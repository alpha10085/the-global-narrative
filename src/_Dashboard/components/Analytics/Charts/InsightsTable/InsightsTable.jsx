"use client";
import React from "react";
import styles from "./InsightsTable.module.css";
import FilterBar from "../../FilterBar/FilterBar";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { chartConfig } from "../../chartConfig";

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
      {/* Scrollable Table Wrapper */}
      <div className={styles.tableScrollX}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{headerLabels?.main}</th>
              <th style={{ textAlign: "center" }}>{headerLabels?.vistor}</th>
            </tr>
          </thead>
          <tbody>
            {chartDataArr?.map((val) => (
              <tr
                key={val?._id}
                className={`${theme.bg200} ${theme.bord20} ${
                  theme.name === "light" ? styles.light : styles.dark
                }`}
              >
                <td>{val?._id}</td>
                <td style={{ textAlign: "center" }}>{val?.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsightsTable;
