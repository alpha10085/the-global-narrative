"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import styles from "./ChartLine.module.css";
import FilterBar from "../../FilterBar/FilterBar";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { chartConfig } from "../../chartConfig";
import MetricsHeader from "../../MetricsHeader/MetricsHeader";

const ChartLine = ({ title = "Daily Traffic", data, type }) => {
  const { theme } = useTheme();

  const { metadata } = data;
  const chartDataArr = data?.data || [];
  const labels = chartDataArr?.map((d) => d?._id);
  const dataset = chartDataArr?.map((d) => d?.count);
  const initialValue = metadata?.total;

  // Convert data into Recharts format
  const rechartsData = [];

  if (initialValue) {
    rechartsData.push({ name: "Start", value: initialValue });
  }

  labels?.forEach((label, i) => {
    rechartsData.push({ name: label, value: dataset[i] });
  });

  return (
    <div
      className={`${styles.card} ${theme.background} ${theme.bord20} showSmooth`}
    >
      <div className={styles.head}>
        <div className="flex al-i-c just-sb w-100 wrap mb-20 gap20">
          <h2 className={`${styles.title} ${theme.color}`}>{title}</h2>
          <FilterBar type={type} />
        </div>
        <MetricsHeader metadata={metadata} />
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={rechartsData}
            margin={{ top: 20, right: 50, bottom: 30 }}
          >
            <CartesianGrid className={styles.line} strokeDasharray="" />
            <XAxis className={styles.XAxis} dataKey="name" tick={{ dy: 10 }} />
            <YAxis allowDecimals={false} tick={{ dx: -10 }} />
            <Tooltip className={styles.Tooltip} />
            <Area
              type="natural"
              dataKey="value"
              stroke="#3b82f6"
              fill="rgba(17, 0, 255, 0.25)"
              strokeWidth={2}
              dot={{
                r: 5,
                fill: "#3b82f6",
                stroke: "#2563eb",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#2563eb",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartLine;
