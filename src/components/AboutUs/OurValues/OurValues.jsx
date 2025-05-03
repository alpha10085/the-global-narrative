import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./OurValues.module.css";
import Card from "./Card/Card";

const OurValues = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <SectionTitle title={data?.title} className={styles.title} />
      <div className={`${styles.list} gap20 flex wrap mt-20 `}>
        {data?.cards?.map((val, index) => (
          <Card 
          index={index+1}
          data={val} key={index} />
        ))}
      </div>
    </div>
  );
};

export default OurValues;
