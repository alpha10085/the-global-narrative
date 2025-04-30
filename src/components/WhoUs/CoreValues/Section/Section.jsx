import { useInView } from "react-intersection-observer";
import styles from "./Section.module.css";
import { handleReplaceDot } from "@/utils/text";
const Section = ({ value, callBack = () => {}, index, activeIndex }) => {
  const { ref, inView } = useInView({
    threshold: 0.6, // Trigger when 50% of the item is in view
    triggerOnce: false,
    onChange: (inView) => {
      if (inView) callBack(value?._id);
    },
  });
  return (
    <div
      key={value?._id}
      ref={ref}
      id={`id_${value?._id}`}
      className={`${styles.valueItem} ${
        value?._id === activeIndex ? styles.active : styles.hidden
      }`}
    >
      <div className={styles.number}>{`0${index + 1}`}</div>
      <div className={styles.text}>
        <h3 className="mb-10">{value?.title}</h3>
        <p>{value?.description}</p>
      </div>
    </div>
  );
};

export default Section;
