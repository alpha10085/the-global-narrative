import { useEffect, useState } from "react";
import styles from "./PageStrategy.module.css";
import CloseIcon from "@mui/icons-material/Close";
const PageStrategy = ({  onChange = () => {} }) => {
  const [selectedOption, setSelectedOption] = useState("defualt");
  const handleChnage = (value) => {
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div className={`${styles.container} flex al-i-c just-sb `}>
      <div
        onClick={() => handleChnage("defualt")}
        className={`${styles.option}  ${
          selectedOption === "defualt" ? styles.active : ""
        }`}
      >
        defualt Strategy
      </div>
      <div
        onClick={() => handleChnage("SSRWrapper")}
        className={`${styles.option} ${
          selectedOption === "SSRWrapper" ? styles.active : ""
        }`}
      >
        SSR Wrapper Strategy
      </div>
    </div>
  );
};

export default PageStrategy;
