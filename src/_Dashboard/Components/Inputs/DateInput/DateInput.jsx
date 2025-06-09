import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./DateInput.module.css";
import "react-datepicker/dist/react-datepicker.css";
import ErrorMessage from "@/_Dashboard/components/ErrorMessage/ErrorMessage";
import { formatTimeAgo } from "@/utils/date";
import EventIcon from "@mui/icons-material/Event";
import { useClickOut } from "@/hooks/useClickout";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";
import { format } from "date-fns";
const DateInput = ({
  onChange = () => "",
  show = true,
  theme,
  className = "",
  field = {},
  currentValue = null,
  error = null,
  translations = {},
}) => {
  const { ref } = useClickOut({
    onClickOutside: () => setIsopen(false),
  });
  const [isopen, setIsopen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { readOnly, name, label, placeholder, disablePast = false } = field;
  const [date, setDate] = useState(currentValue || null);
  let isDarkMode = theme?.name === "dark";
  const handleChange = (value) => {
    try {
      const HALF_DAY_MS = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
      const now = Date.now();
      let newVal = new Date(value).getTime();

      if (disablePast && newVal <= now) {
        newVal = now + HALF_DAY_MS;
      }

      if (newVal < 10_000_000) {
        newVal = now;
      }

      const formattedDate = new Date(newVal);
      setDate(formattedDate);
      onChange(name, format(formattedDate, "MM/dd/yyyy"));
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg(error.message);
      console.error("Error in handleChange:", error);
    }
  };

  return (
    <label
      id={handleReplaceDot(field?.name)}
      className={`flex column showSmooth ${styles.label} ${className} ${
        isopen && styles.open
      }`}
    >
      <h1>{label}</h1>
      <div
        ref={ref}
        onClick={() => setIsopen(true)}
        className={`${styles.inputwrapper} ${
          isDarkMode ? "dark-mode" : "light-mode"
        }  ${theme?.background}  ${theme?.color} ${theme?.bord20}`}
      >
        <DatePicker
          dropdownMode="select"
          selected={date}
          placeholderText="choose date"
          onChange={handleChange}
          className={`${
            isDarkMode ? "dark-mode-datepicker" : "light-mode-datepicker"
          } ${theme?.color} `}
        />
        <div className={`${styles.dateFormated} gap10 flex al-i-c`}>
          {date && formatTimeAgo(date, translations)}
          <EventIcon />
        </div>
      </div>
      <ErrorMessage theme={theme} message={errorMsg || error} label={label} />
    </label>
  );
};

export default DateInput;
