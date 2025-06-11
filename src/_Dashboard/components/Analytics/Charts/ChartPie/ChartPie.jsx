"use client";
import { Pie } from "react-chartjs-2";
import styles from "./ChartPie.module.css";
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

const ChartPie = ({ data, chartType }) => {
  const { theme } = useTheme();

  const { charts, metadata } = data;

  const chartDataArr = charts?.[chartType] || [];
  const { title } = chartConfig[chartType] || {};
  const labels = chartDataArr.map((d) => d._id);
  const values = chartDataArr.map((d) => d.count);

  const colors = labels?.map((_, i) => colorPalette[i % colorPalette.length]);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 2,
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
    },
  };

  return (
    <div
      className={`${styles.card} ${theme.background} ${theme.bord10} showSmooth`}
    >
      <div className=" flex al-i-c just-sb w-100 wrap p-20 mb-20 gap20">
        <h2 className={`${styles.title} ${theme.color}`}>{title}</h2>
        {/* Top Filter */}
        <FilterBar chartType={chartType} />
      </div>

      <div className={styles.chartLegendWrapper}>
        <MetricsHeader metadata={metadata} />
        
        {/* Custom Legend */}
        <div className={styles.customLegend}>
          {labels?.map((label, i) => (
            <div key={label} className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: colors[i] }}
              />
              <span className={styles.legendLabel}>{label}</span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className={styles.chartWrapper}>
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartPie;
