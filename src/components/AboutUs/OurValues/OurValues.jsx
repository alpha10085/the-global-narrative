import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./OurValues.module.css";
import Card from "./Card/Card";
import Aos from "@/components/Shared/Animtions/Aos/Aos";

const OurValues = ({ data = [] }) => {
  return (
    <div className={`flex ${styles.container}`}>
      <div className={styles.wrapper}>
        <SectionTitle delay={0} title={data?.title} className={styles.title} />

        <Aos
        delay={500}
          activeClassName={styles.active}
          className={`flex gap20 wrap mt-20 ${styles.list}`}
        >
          {data?.cards?.map((val, index) => (
            <Card
              className={styles.card}
              index={index}
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
