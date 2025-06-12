"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import PhoneIphoneTwoToneIcon from "@mui/icons-material/PhoneIphoneTwoTone";
import DesktopWindowsTwoToneIcon from "@mui/icons-material/DesktopWindowsTwoTone";
import TabletMacTwoToneIcon from "@mui/icons-material/TabletMacTwoTone";
import DeviceUnknownTwoToneIcon from "@mui/icons-material/DeviceUnknownTwoTone";
import styles from "./DeviceChart.module.css";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { chartConfig } from "../../chartConfig";

const COLORS = ["#3b82f6", "#6366f1", "#f59e0b", "#444444"];

const DevicePieChart = ({ data, chartType }) => {
  const { theme } = useTheme();
  const { charts } = data;
  const { title } = chartConfig[chartType] || {};

  const raw = charts?.devices || [];
  const total = raw?.reduce((acc, cur) => acc + cur?.count, 0);

  const ICONS = {
    mobile: <PhoneIphoneTwoToneIcon style={{ color: COLORS[0] }} />,
    Desktop: <DesktopWindowsTwoToneIcon style={{ color: COLORS[1] }} />,
    tablet: <TabletMacTwoToneIcon style={{ color: COLORS[2] }} />,
    UnKnown: <DeviceUnknownTwoToneIcon style={{ color: COLORS[3] }} />,
  };

  const chartData = ["mobile", "Desktop", "tablet", "UnKnown"].map((type) => {
    const found = raw?.find((d) => d?._id.toLowerCase() === type.toLowerCase());
    return {
      name: type,
      value: found?.count || 0,
    };
  });

  return (
    <div className={`${styles.container} ${theme.background} ${theme.bord20}`}>
      <h2 className={`${styles.title} ${theme.color}`}>{title}</h2>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={65}
              innerRadius={40}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={entry?.name} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legend}>
        {chartData?.map((entry, i) => (
          <div key={entry?.name} className={styles.legendItem}>
            <span className={styles.icon}>{ICONS[entry?.name]}</span>
            <span className={styles.label}>{entry?.name}</span>
            <span className={styles.value}>
              {entry?.value} (
              {total ? Math.round((entry?.value / total) * 100) : 0}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicePieChart;
