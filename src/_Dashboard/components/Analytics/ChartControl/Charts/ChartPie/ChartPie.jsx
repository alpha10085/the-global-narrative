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

const ChartPie = ({ title, labels, data, theme }) => {
  const colors = labels?.map((_, i) => colorPalette[i % colorPalette.length]);

  const chartData = {
    labels,
    datasets: [
      {
        data,
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
      },
    },
  };

  return (
   <div className={`${styles.card} ${theme.background} ${theme.bord10} showSmooth`}>
  <h2 className={`${styles.title} ${theme.color}`}>{title}</h2>

  <div className={styles.chartLegendWrapper}>
    {/* Chart */}
    <div className={styles.chartWrapper}>
      <Pie data={chartData} options={options} />
    </div>

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
  </div>
</div>

  );
};

export default ChartPie;
