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

const ChartLine = ({
  title,
  labels,
  data,
  initialValue = null,
  theme,
}) => {
  const chartData = {
    labels: initialValue ? ["Start", ...labels] : labels,
    datasets: [
      {
        label: title,
        data: initialValue ? [initialValue, ...data] : data,
        fill: false,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
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
      <h2 className={`${styles.title} ${theme.color}`}>{title}</h2>

      <div className={styles.chartWrapper}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartLine;
