"use client";
import React, { useEffect, useRef } from "react";
import styles from "./InsightsTable.module.css";
import FilterBar from "../../FilterBar/FilterBar";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { chartConfig } from "../../chartConfig";

const InsightsTable = ({ data = [], chartType }) => {
  const { theme } = useTheme();
  const { charts } = data;
  const chartDataArr = charts?.[chartType] || [];
  const { title } = chartConfig[chartType] || {};
  const labels = chartDataArr?.map((d) => d._id);
  const values = chartDataArr?.map((d) => d.count);

  return (
    <div
      className={`${styles.tableWrapper} ${theme.background} ${theme.color} ${theme.bord10} showSmooth`}
    >
      <div className="flex al-i-c just-sb w-100 wrap p-30 mb-20 gap20">
        <h2 className={`${styles.title} ${theme.color}`}>{title}</h2>
        {/* Top Filter */}
        <FilterBar chartType={chartType} />
      </div>

      <table className={styles.table}>
        <thead className={`${theme.background} ${theme.color}`}>
          <tr>
            <th>Route</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {labels?.map((label, i) => (
            <tr
              key={label}
              className={`${theme.hoverBg10} ${theme.bord20} ${
                theme.name == "light" ? styles.light : styles.dark
              }`}
            >
              <td>{label}</td>
              <td>{values[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InsightsTable;
