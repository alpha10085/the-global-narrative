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
    name: "Page A",
    day: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    day: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    day: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    day: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    day: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    day: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    day: 3490,
    pv: 4300,
    amt: 2100,
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
