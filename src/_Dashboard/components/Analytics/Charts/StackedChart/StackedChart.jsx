"use client";
import { Bar } from "react-chartjs-2"; 
import styles from "./StackedChart.module.css";
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
import MetricsHeader from "../../MetricsHeader/MetricsHeader";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { chartConfig } from "../../chartConfig";


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

const StackedChart = ({ data, chartType }) => {
  const { theme } = useTheme();
  const { charts, metadata } = data;
  const chartDataArr = charts?.[chartType] || [];
  const { title } = chartConfig[chartType] || {};
  const labels = chartDataArr?.map((d) => d._id);

  // Example if you want to support stacking multiple data series:
  const datasetKeys = Object.keys(chartDataArr[0] || {}).filter(
    (key) => key !== "_id"
  );

  const datasets = datasetKeys.map((key, idx) => ({
    label: key,
    data: chartDataArr.map((d) => d[key]),
    backgroundColor: colorPalette[idx % colorPalette.length],
    stack: "Stack 0",
  }));

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
      title: {
        display: false,
        text: title,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
      },
    },
  };

  return (
    <div className={`${styles.card} ${theme.background} ${theme.bord10} showSmooth`}>
      <div className="flex al-i-c just-sb w-100 wrap p-20 mb-20 gap20">
        <h2 className={`${styles.title} ${theme.color}`}>{title}</h2>
        <FilterBar chartType={chartType} />
      </div>

      <div className={styles.chartLegendWrapper}>
        <div className={styles.customLegend}>
          {datasets?.map((ds, i) => (
            <div key={ds.label} className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: ds.backgroundColor }}
              />
              <span className={styles.legendLabel}>{ds.label}</span>
            </div>
          ))}
          <MetricsHeader metadata={metadata} />
        </div>

        <div className={styles.chartWrapper}>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default StackedChart;
