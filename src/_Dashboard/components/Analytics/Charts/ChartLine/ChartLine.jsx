"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./ChartLine.module.css";

import FilterBar from "../../FilterBar/FilterBar";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { chartConfig } from "../../chartConfig";
import MetricsHeader from "../../MetricsHeader/MetricsHeader";

const ChartLine = ({ data, chartType }) => {
  const { theme } = useTheme();

  const { metadata, charts } = data;
  console.log("🚀 ~ ChartLine ~ metadata, charts:", metadata, charts);

  const chartDataArr = charts?.[chartType] || [];
  const { title } = chartConfig[chartType] || {};
  const labels = chartDataArr?.map((d) => d?._id);
  const dataset = chartDataArr?.map((d) => d?.count);
  const initialValue = metadata?.total;
  console.log("🚀 ~ ChartLine ~ initialValue:", initialValue);
  const projectedValue = dataset?.length ? dataset[dataset.length - 1] + 1 : 0;
  console.log("🚀 ~ ChartLine ~ projectedValue:", projectedValue);

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
        pointBackgroundColor: "#000",
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
      // x: {
      //   grid: {
      //     drawOnChartArea: false,
      //   },
      // },
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
        <Example />
      </div>
    </div>
  );
};

const data = [
  {
    name: "jan 8",
    day: 35,
  },
  {
    name: "jan 9",
    day: 75,
  },
  {
    name: "jan 10",

    day: 88,
  },
  {
    name: "jan 11",
    day: 98,
  },
  {
    name: "jan 12",
    day: 40,
  },
  {
    name: "jan 13",
    day: 43,
  },
  {
    name: "jan 14",
    day: 59,
  },
];

const Example = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={500} height={400} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="linear" dataKey="day" stroke="blue" fill="#0000ff4d" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChartLine;
