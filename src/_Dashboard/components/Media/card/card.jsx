"use client";
import React, { memo, useEffect, useState } from "react";
import styles from "./Card.module.css";
import ImageDetails from "../FileDetails/FileDetails";
import DisplayMedia from "../DisplayMedia/DisplayMedia";
import { customText } from "@/utils/text";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Card = ({
  item,
  theme,
  onRemove,
  canDelete,
  translations,
  onSelect,
  isSelected,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [hide, setHide] = useState(false);
  const [hideEvnet, sethideEvnet] = useState(false);
  const handleShow = () => {
    setShowDetails(!showDetails);
  };
  const handleHide = () => {
    sethideEvnet(true);
    setShowDetails(false);
    setTimeout(() => {
      setHide(true);
      onRemove();
    }, 200);
  };
  if (hide) return;
  return (
    <>
      <div
        className={`${styles.card} ${theme.bord20} ${
          hideEvnet && styles.hide
        }  ShowSmoothEffect   `}
      >
        {/* Selection Checkbox */}
        <div className={`${styles.actions}`}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(item._id, e.target.checked)}
            className={` ${styles.checkbox}  ${theme.bord10} ${
              theme.bg_overlay
            } ${theme.name === "dark" ? styles.checkdark : ""} `}
          />
          <button
            onClick={handleShow}
            className={`${styles.infoButton} ${theme.bord10} ${theme.color} flex-c ${theme.bg_overlay}`}
          >
            <MoreHorizIcon />
          </button>
        </div>
        <DisplayMedia
          theme={theme}
          className={`${styles.image}`}
          mainClassName={`${theme.bgMedia} ${styles.media}`}
          url={item?.url}
          type={item?.mimetype}
          controls={true}
          autoPlay={false}
          thumbnail={item?.thumbnail}
        />
        <div className={`${styles.fileinfo} ${theme.bg_overlay}`}>
          <h1>{customText(item?.filename, 35)}</h1>
        </div>
      </div>
      {showDetails && (
        <ImageDetails
          open={showDetails}
          onClose={handleShow}
          theme={theme}
          {...item}
          data={item}
          canDelete={canDelete}
          onRmove={handleHide}
          translations={translations}
        />
      )}
    </>
  );
};
export default memo(Card, (prev, next) => {
  return prev?.item?._id === next?.item?._id &&
         prev?.theme?.name === next?.theme?.name &&
         prev?.isSelected === next?.isSelected;
});
