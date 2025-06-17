import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./WhoUsSection.module.css";
import Card from "./Card/Card";

const WhoUsSection = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <SectionTitle title={data?.title} className={styles.title} />
      <div className={`${styles.list}`}>
        {data?.members?.map((val) => (
          <Card data={val} key={val?._id} />
        ))}
      </div>
    </div>
  );
};

export default WhoUsSection;
