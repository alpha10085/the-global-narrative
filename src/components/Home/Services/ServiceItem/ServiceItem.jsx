"use client";
import { useInView } from "react-intersection-observer";
import styles from "./ServiceItem.module.css";
import Img from "@/components/Shared/img/Img";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { customText } from "@/utils/text";

const ServiceItem = ({ item = {}, index = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const delayStyle = {
    transitionDelay: `${index * 100}ms`,
  };

  return (
    <div
      id={`id_${item?._id}`}
      ref={ref}
      className={`${styles.valueItem} ${inView ? styles.show : styles.hidden}`}
      style={delayStyle}
    >
      <div className={styles.imageWrapper}>
        <div className={styles.iconWrapper}>
          <ArrowOutwardIcon fontSize="small" />
        </div>
        <Img
          className={styles.cardImage}
          url={item?.poster?.url}
          alt={item?.title || ""}
        />
 
        <div className={styles.textOverlay}>
          <h3>{item?.title}</h3>
          <p>{customText(item?.description, 50)}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
