"use client";
import PhoneIphoneTwoToneIcon from "@mui/icons-material/PhoneIphoneTwoTone";
import DesktopWindowsTwoToneIcon from "@mui/icons-material/DesktopWindowsTwoTone";
import TabletMacTwoToneIcon from "@mui/icons-material/TabletMacTwoTone";
import styles from "./DeviceChart.module.css";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";

const DeviceChart = ({ data }) => {
  const { theme } = useTheme();
  const { charts } = data;
  const total = charts?.devices?.reduce((sum, d) => sum + d?.count, 0);
  const allTypes = ["mobile", "Desktop", "tablet", "Unknown"];

  const iconMap = {
    mobile: (
      <PhoneIphoneTwoToneIcon fontSize="large" style={{ color: theme.color }} />
    ),
    Desktop: (
      <DesktopWindowsTwoToneIcon
        fontSize="large"
        style={{ color: theme.color }}
      />
    ),
    tablet: (
      <TabletMacTwoToneIcon fontSize="large" style={{ color: theme.color }} />
    ),
  };

  return (
    <div className={styles.container}>
      {allTypes?.map((type) => {
        const device = charts?.devices?.find(
          (d) => d?._id.toLowerCase() === type.toLowerCase()
        ) || { count: 0 };

        const percentage = total ? (device?.count / total) * 100 : 0;

        return (
          <div
            key={type}
            className={`${styles.card} ${theme.background} ${theme.color} ${theme.bord20}`}
          >
            <div>{iconMap[type]}</div>
            <h3 className={`${styles.label} ${theme.color}`}>{type}</h3>
            <div
              className={styles.progressWrapper}
              style={{
                backgroundColor: theme.name === "light" ? "#e5e7eb" : "#3f3f46",
              }}
            >
              <div
                className={styles.progressBar}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className={styles.count}>{device.count} uses</span>
          </div>
        );
      })}
    </div>
  );
};

export default DeviceChart;
