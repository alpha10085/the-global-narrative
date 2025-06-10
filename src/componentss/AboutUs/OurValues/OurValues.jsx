import SectionTitle from "@/componentss/SectionTitle/SectionTitle";
import styles from "./OurValues.module.css";
import Card from "./Card/Card";
import FloatedSection from "@/componentss/Shared/FloatedSection/FloatedSection";
import Aos from "@/componentss/Shared/Animtions/Aos/Aos";

const OurValues = ({ data = [] }) => {
  return (
    <div id="active-section" data-offset="0" className={styles.container}>
     
        <div className={styles.wrapper}>
          <SectionTitle
            delay={0}
            title={data?.title}
            className={styles.title}
          />

          <Aos
            activeClassName={styles.active}
            className={`flex gap20 column mt-20 ${styles.list}`}
          >
            {data?.cards?.map((val, index) => (
              <Card
                className={styles.card}
                index={index + 1}
                data={val}
                key={val?._id}
              />
            ))}
          </Aos>
        </div>
    </div>
  );
};

export default OurValues;
