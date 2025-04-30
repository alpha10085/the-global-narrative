import React from "react";
import styles from "./Popup.module.css";
import { scrollToElement } from "@/utils/document";
import { handleReplaceDot } from "@/utils/text";
import Img from "@/components/Shared/img/Img";

const Popup = ({ data = [], activeIndex = "01" }) => {
  return (
    <div className={styles.popupContainer}>
      <div className={`${styles.wrapper} flex-c  gap20`}>
        {data?.points?.map((value, index) => {
          return (
            <div
              onClick={() => {
                scrollToElement(`#id_${value?._id}`, 120);
              }}
              key={value?._id}
              className={`${styles.icon} ${
                value?._id === activeIndex ? styles.activeCircle : ""
              }`}
            >
              <Img
                theme="dark"
                className={styles.logo}
                url={value?.logo?.url}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popup;
