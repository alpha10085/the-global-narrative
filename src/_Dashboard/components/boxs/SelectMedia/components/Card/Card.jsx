import React, { memo, useState } from "react";
import styles from "./Card.module.css";
import Img from "@/components/shared/img/Img";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DisplayMedia from "@/_Dashboard/components/Media/DisplayMedia/DisplayMedia";
import { customText } from "@/utils/text";
const Card = ({ item, active, theme, onClick, index }) => {  
  return (
    <div
      onClick={onClick}
      className={`${styles.card} flex  ${active && styles.sctive} ${theme?.bord20
        }`}
    >
      <DisplayMedia
        
        theme={theme} className={`${styles.iamge} `}
        type={item?.mimetype}
        autoPlay={false}
        thumbnail={item?.thumbnail}
        url={item?.url} />

      <div className={`${styles.fileinfo} ${theme.bg_overlay}`}>
        <h1>{customText(item?.filename, 25)}</h1>
      </div>
      {active && (
        <div
          className={`showSmooth ${styles.selectedlayout} flex-c ${theme?.bg_overlay}`}
        >
          <DoneOutlineIcon />
        </div>
      )}
    </div>
  );
};


export default memo(Card, (prev, next) => {
  return prev?.item?._id === next?.item?._id && prev?.active === next?.active;
});
