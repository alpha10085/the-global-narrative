import { useQueryParams } from "@/hooks/useQueryParams";
import styles from "./FilterBar.module.css";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { filterConfigs } from "./FilterConfig";

const FilterBar = () => {
  const { theme } = useTheme();
  const { searchParams, singleValue } = useQueryParams();

  const defaultValues = {
    days: "7",
    pathname: "",
    device: "",
    chartType: "dailyTraffic",
  };
    
  return (
    <div className={`${styles.container} ${theme.bord10} ${theme.background}`}>
      {filterConfigs?.map(({ key, label, options }) => {
        const value = searchParams?.[key] ?? defaultValues[key];

        return (
          <div key={key} className={styles.field}>
            <label className={styles.label}>{label}</label>
            <select
              value={value}
              onChange={(e) => singleValue(key, e.target.value)}
              className={`${styles.select} ${theme.color} ${theme.background} ${theme.bord10}`}
            >
              {options?.map(({ value: optionValue, label: optionLabel }) => (
                <option key={optionValue} value={optionValue}>
                  {optionLabel}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default FilterBar;
