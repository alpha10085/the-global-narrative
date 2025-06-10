import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./OurValues.module.css";
import Card from "./Card/Card";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";

const OurValues = ({ data = [] }) => {
  return (
    <div id="active-section" data-offset="0" className={styles.container}>
        <FloatedSection>
        <div className={styles.wrapper}>
          <SectionTitle
            delay={0}
            title={data?.title}
            className={styles.title}
          />

          <div className={`flex gap20 column mt-20 ${styles.list}`}>
            {data?.cards?.map((val, index) => (
              <Card index={index + 1} data={val} key={val?._id} />
            ))}
          </div>
        </div>
    </FloatedSection>
      </div>
  );
};

export default OurValues;
