import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./OurValues.module.css";
import Card from "./Card/Card";
import Aos from "@/components/Shared/Animtions/Aos/Aos";

const OurValues = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <SectionTitle title={data?.title} className={styles.title} />
      <Aos
        delay={500}
        activeClassName={styles.active}
        className={`${styles.list} gap20 flex wrap mt-20 `}
      >
        {data?.cards?.map((val, index) => (
          <Card
          className={styles.card}
          delay={index * 0.2 + 0.2}
          index={index + 1} data={val} key={index} />
        ))}
      </Aos>
    </div>
  );
};

export default OurValues;
