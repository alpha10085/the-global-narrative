import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./ServiceItem.module.css";
import MainLink from "@/components/MainLink/MainLink";
import { customText } from "@/utils/text";

const ServiceItem = ({ value, index, activeIndex, callBack }) => {
  const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: false,
    onChange: (inView) => {
      if (inView) callBack(index);
    },
  });

  const isActive = value?._id === activeIndex;

  return (
    <div
      ref={ref}
      id={`id_${value?._id}`}
      className={`${styles.valueItem} ${
        isActive ? styles.active : styles.hidden
      }`}
    >
      <h3>{value?.title}</h3>
      <p>{customText(value?.description, 400)}</p>
      <MainLink
        className={styles.MainLink}
        text="Read more"
        href={`/services/#id_${value?._id}`}
      />
    </div>
  );
};

export default ServiceItem;
