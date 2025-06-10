import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./FiltersList.module.css";

const FiltersList = ({
  convertedObject,
  handleSbmit,
  theme,
  translations = {},
}) => {
  return (
    <div className={`${styles.list} flex gap10 wrap`}>
      {convertedObject?.map((val) => (
        <div
          key={val?.key + val?.condition + val?.value}
          onClick={() => {
            handleSbmit(val);
          }}
          className={`${styles.deletebutton} flex-c gap5 ${theme?.bord20} ${theme?.color} ${theme?.background}`}
        >
          <h1>
            {translations?.inputs?.[val?.key]}{" "}
            {translations?.filterSystem?.condtions?.[val?.condition]}{" "}
            {val?.value === "true"
              ? translations?.yes
              : val?.value === "false"
              ? translations?.no
              : val?.value}
          </h1>
          <CloseIcon />
        </div>
      ))}
    </div>
  );
};

export default FiltersList;
