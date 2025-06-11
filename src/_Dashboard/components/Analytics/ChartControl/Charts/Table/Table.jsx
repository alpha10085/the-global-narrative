import React from "react";
import styles from "./Table.module.css";

const Table = ({ title, labels = [], data = [], theme }) => {
  return (
    <>
      <h2 className={`${styles.title} ${theme.color}`}>{title}</h2>
      <div
        className={`${styles.tableWrapper} ${theme.background} ${theme.color} ${theme.bord10} showSmooth`}
      >
        <table className={styles.table}>
          <thead className={`${theme.background} ${theme.color}`}>
            <tr>
              <th>Route</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {labels?.map((label, i) => (
              <tr key={label} className={`${theme.hoverBg10} ${theme.bord20} ${theme.name == "light" ? styles.light : styles.dark }`}>
                <td>{label}</td>
                <td>{data[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
