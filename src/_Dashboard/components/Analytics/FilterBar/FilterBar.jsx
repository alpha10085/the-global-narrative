"use client";
import { useQueryParams } from "@/hooks/useQueryParams";
import styles from "./FilterBar.module.css";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

const FilterBar = ({ type }) => {
  const { theme } = useTheme();
  const { searchParams, singleValue } = useQueryParams();

  const filterConfigs = [
    {
      key: `${type}`, // e.g. "dailyTraffic"
      options: [
        { value: "today", label: "Today" },
        { value: "7d", label: "Last 7 days" },
        { value: "1m", label: "Last 1 month" },
        { value: "3m", label: "Last 3 months" },
        { value: "6m", label: "Last 6 months" },
        { value: "9m", label: "Last 9 months" },
        { value: "1y", label: "Last 1 year" },
      ],
    },
  ];

  return (
    <div className={`${styles.container} flex al-i-c `}>
      {filterConfigs?.map(({ key, options }) => {
       const value = searchParams?.[key] ?? "7d";
        const isLight = theme?.name === "light";
        return (
          <div
            key={key}
            className={`${styles.wrapper} flex al-i-c ${theme?.color}`}
            style={{
              backgroundColor: isLight ? "#f5f5f5" : "#121212",
              border: `1px solid ${isLight ? "#ccc" : "#333"}`,
            }}
          >
            <div className={styles.icon}>
              <DateRangeOutlinedIcon
                fontSize="small"
                style={{ color: isLight ? "#555" : "#aaa" }}
              />
            </div>
            <select
              value={value}
              onChange={(e) => singleValue(key, e.target.value)}
              className={`${styles.select}`}
              style={{
                color: isLight ? "#000" : "#fff",
              }}
            >
              {options?.map(({ value: optionValue, label: optionLabel }) => (
                <option
                  key={optionValue}
                  value={optionValue}
                  className={` ${theme?.color} ${theme?.background} ${theme?.bord10}`}
                  style={{
                    backgroundColor: isLight ? "#fff" : "#121212",
                    color: isLight ? "#000" : "#fff",
                  }}
                >
                  {optionLabel}
                </option>
              ))}
            </select>
            <span
              style={{ color: isLight ? "#666" : "#999" }}
              className={styles.arrow}
            >
              ▾
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default FilterBar;
