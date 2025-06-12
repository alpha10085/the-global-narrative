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

const ChartLine = ({ data, chartType }) => {
  const { theme } = useTheme();

  const { metadata, charts } = data;
  const chartDataArr = charts?.[chartType] || [];
  const { title } = chartConfig[chartType] || {};
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
      className={`${styles.card} ${theme.background} ${theme.bord10} showSmooth`}
    >
      <div className="p-15">
        <div className="flex al-i-c just-sb w-100 wrap mb-20 gap20">
          <h2 className={`${styles.title} ${theme.color}`}>{title}</h2>
          <FilterBar chartType={chartType} />
        </div>
        <MetricsHeader metadata={metadata} />
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={rechartsData}   margin={{ top: 20, right: 50, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3"  />
            <XAxis dataKey="name"  tick={{ dy: 10 }}  />
            <YAxis allowDecimals={false}   tick={{ dx: -10 }}  />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              fill="rgba(59, 130, 246, 0.3)" 
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
