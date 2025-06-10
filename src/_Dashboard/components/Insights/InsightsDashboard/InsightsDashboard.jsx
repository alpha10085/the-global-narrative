"use client";
import styles from "./InsightsDashboard.module.css";
import FilterBar from "../FilterInsightsBar/FilterBar/FilterBar";
import InsightsChart from "../FilterInsightsBar/InsightsChart/InsightsChart";
import { chartConfig } from "./chartConfig";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";

const InsightsDashboard = ({ data, searchParams }) => {
  const { theme } = useTheme();
  const chartType = searchParams?.chartType || "dailyTraffic";

  if (!data)
    return (
      <p className={`${styles.error} ${theme.danger30}`}>Failed to load data</p>
    );

  const { metadata, charts } = data;
  const chartData = charts?.[chartType] || [];

  return (
    <div className={styles.container}>
      <h1 className={`${styles.heading} ${theme.color}`}>
        📊 Insights Dashboard
      </h1>

      <div className={styles.filterBar}>
        <FilterBar />
      </div>
     <p className={styles.infoText}>
        Showing data from last {metadata?.days} days.
      </p>
      {chartType === "dailyTraffic" &&
        metadata?.returnedUsers !== undefined && (
          <div className={`${styles.metricsFlex} flex just-sb mb-20 wrap flex-wrap gap15`}>
            <div className={`${styles.metricBox} ${theme.background} ${theme.card}`}>
              <p className={`${styles.metricTitle} ${theme.color}`}>Total Visitors</p>
              <p className={`${styles.metricValue} ${theme.color}`}>{metadata.total}</p>
            </div>

            <div className={`${styles.metricBox} ${theme.background} ${theme.card}`}>
              <p className={`${styles.metricTitle} ${theme.color}`}>Returned Visitors</p>
              <p className={`${styles.metricValue} ${theme.color}`}>{metadata.returnedUsers}</p>
            </div>

            <div className={`${styles.metricBox} ${theme.background} ${theme.card}`}>
              <p className={`${styles.metricTitle} ${theme.color}`}>Retention Rate</p>
              <p className={`${styles.metricValue} ${theme.color}`}>{metadata.retentionRate}%</p>
            </div>
          </div>
        )}

      <div className={styles.chart}>
        <InsightsChart
          title={chartConfig[chartType]?.title}
          type={chartConfig[chartType]?.type}
          labels={chartData?.map((d) => d?._id)}
          data={chartData?.map((d) => d?.count)}
          initialValue={chartType === "dailyTraffic" ? metadata?.total : null}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default InsightsDashboard;
