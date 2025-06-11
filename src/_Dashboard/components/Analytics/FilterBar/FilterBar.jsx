"use client";
import { useQueryParams } from "@/hooks/useQueryParams";
import styles from "./FilterBar.module.css";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

const FilterBar = ({ chartType }) => {
  const { theme } = useTheme();
  const { searchParams, singleValue } = useQueryParams();

  const defaultValues = {
    days: "7",
  };

  const filterConfigs = [
    {
      key: `${chartType}`,
      options: [
        { value: "1", label: "Today" },
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "100", label: "Last 100 days" },
      ],
    },
  ];

  return (
    <div className={`${styles.container} flex al-i-c `}>
      {filterConfigs?.map(({ key, options }) => {
        const paramKey = key.split(".")[1];
        const value = searchParams?.[key] ?? defaultValues[paramKey];
        const isLight = theme.name === "light";
        return (
          <div
            key={key}
            className={`${styles.wrapper} flex al-i-c ${theme.color}`}
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
                  className={` ${theme.color} ${theme.background} ${theme.bord10}`}
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
