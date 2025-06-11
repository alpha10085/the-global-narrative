"use client";
import { Bar } from "react-chartjs-2";
import styles from "./ChartBar.module.css";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
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
import { chartConfig } from "../../chartConfig";
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

const colorPalette = [
  "#3b82f6",
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#8b5cf6",
  "#ec4899",
  "#6366f1",
];

const ChartBar = ({ data, chartType }) => {
  const { theme } = useTheme();

  const { metadata, charts } = data;
  const chartDataArr = charts?.[chartType] || [];
  const { title } = chartConfig[chartType] || {};
  const labels = chartDataArr?.map((d) => d?._id);
  const dataset = chartDataArr?.map((d) => d?.count);
  const initialValue = null;

  // Custom colors per label example (for a Country chart or any other)
  const colors = labels?.map((_, i) => colorPalette[i % colorPalette.length]);

  const chartData = {
    labels: initialValue ? ["Start", ...labels] : labels,
    datasets: [
      {
        label: title,
        data: initialValue ? [initialValue, ...dataset] : dataset,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
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
        ticks: {
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
          stepSize: 1,
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
      className={`${styles.card} showSmooth ${theme.background} ${theme.bord10}`}
    >
      <div className=" p-15">
        <div className=" flex al-i-c just-sb w-100 wrap mb-20 gap20">
          <h2 className={`${styles.title} ${theme.color}`}>{title}</h2>
          {/* Top Filter */}
          <FilterBar chartType={chartType} />
        </div>

        <MetricsHeader metadata={metadata} />
      </div>
      <div className={styles.legend}>
        {labels?.map((label, i) => (
          <div key={label} className={styles.legendItem}>
            <div
              className={styles.colorBox}
              style={{ backgroundColor: colors[i] }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className={styles.chartWrapper}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartBar;
