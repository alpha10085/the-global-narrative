"use client";

import { Line } from "react-chartjs-2";
import styles from "./ChartLine.module.css";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import FilterBar from "../../FilterBar/FilterBar";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { chartConfig } from "../../chartConfig";
import { useEffect, useRef } from "react";
import MetricsHeader from "../../MetricsHeader/MetricsHeader";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartLine = ({ data, chartType }) => {
  const { theme } = useTheme();

  const { metadata, charts } = data;

  const chartDataArr = charts?.[chartType] || [];
  const { title } = chartConfig[chartType] || {};
  const labels = chartDataArr?.map((d) => d?._id);
  const dataset = chartDataArr?.map((d) => d?.count);
  const initialValue = metadata?.total;
  const projectedValue = dataset?.length ? dataset[dataset.length - 1] + 1 : 0;

  const chartData = {
    labels: initialValue ? ["Start", ...labels] : [...labels],
    datasets: [
      {
        label: title,
        data: initialValue
          ? [initialValue, ...dataset, projectedValue]
          : [...dataset, projectedValue],
        fill: true,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.1,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#3b82f6",
        pointHoverBackgroundColor: "#2563eb",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
          padding: 10,
          callback: function (value) {
            return value;
          },
        },
        grid: {
          color: "#808080",
          drawTicks: false,
          drawBorder: false,
        },
      },
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div
      className={`${styles.card} ${theme.background} ${theme.bord10} showSmooth`}
    >
      <div className=" p-15">
        <div className="flex al-i-c just-sb w-100 wrap mb-20 gap20">
          <h2 className={`${styles.title} ${theme.color}`}>{title}</h2>
          <FilterBar chartType={chartType} />
        </div>

        <MetricsHeader metadata={metadata} />
      </div>
      <div className={styles.chartWrapper}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartLine;
