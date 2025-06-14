import styles from "./MetricsHeader.module.css";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const MetricCard = ({ label, value, change }) => {
  const { theme } = useTheme();

  const isPositive = change >= 0;
  const isLight = theme.name === "light";

  const cardStyle = {
    color: isLight ? "#000" : "#fff",
  };

  const labelStyle = {
    color: isLight ? "#666" : "#aaa",
  };

  return (
    <div className={styles.metricCard} style={cardStyle}>
      <p className={styles.label} style={labelStyle}>
        {label}
      </p>
      <div className={styles.valueRow}>
        <h3>{value}</h3>
        <span
          className={`${styles.change} flex  ${
            isPositive ? styles.up : styles.down
          }`}
        >
          {isPositive ? <ArrowUpward /> : <ArrowDownward />}
          {isPositive ? "+" : ""}
          {change}%
        </span>
      </div>
    </div>
  );
};

const MetricsHeader = ({ metadata = {} }) => {
  const { theme } = useTheme();

  // Exclude unwanted keys like "days"
  const excludedKeys = ["days"];
  const filteredEntries = Object.entries(metadata).filter(
    ([key]) => !excludedKeys.includes(key)
  );

  return (
    <div
      className={`${styles.metrics} 
      ${theme.bg200}
      ${theme.bord20}`}
      style={{
        borderRadius: "12px",
      }}
    >
      {filteredEntries?.map(([label, value]) => (
        <MetricCard
          key={label}
          theme={theme}
          label={label
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
          value={
            typeof value === "number" && label.toLowerCase().includes("rate")
              ? `${value}%`
              : value
          }
          change={Math.floor(Math.random() * 10 - 5)} // Placeholder logic
        />
      ))}
    </div>
  );
};

export default MetricsHeader;
