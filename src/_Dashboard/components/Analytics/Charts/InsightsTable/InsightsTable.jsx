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
      className={`${styles.tableWrapper}
      ${theme.scrollBar}
      ${theme.background} ${theme.color} ${theme.bord20} showSmooth`}
    >
      <div
        className={`flex al-i-c just-sb w-100 wrap gap20 ${theme.bord20} ${theme.background}  ${styles.head}`}
      >
        <h2 className={`${styles.title}   ${theme.color}`}>
          {headerLabels?.main}
        </h2>
        {/* Top Filter */}
        {/* <FilterBar type={type} /> */}
        <h4 className={styles.vistorsLable}>{headerLabels?.vistor}</h4>
      </div>

      <table className={styles.table}>
        <tbody>
          {chartDataArr?.map((val, i) => (
            <tr
              key={val?._id}
              className={`${theme.bg200} ${theme.bord20} ${
                theme.name == "light" ? styles.light : styles.dark
              }`}
            >
              <td>{val?._id}</td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                {val?.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InsightsTable;
