import SectionTitle from "../../SectionTitle/SectionTitle";
import Card from "./Card/Card";
import styles from "./Testimonials.module.css";

const Testimonials = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <SectionTitle title={data?.title} />
      <div className={`${styles.list} mt-15 flex gap25`}>
        {data?.posts?.map((val) => (
          <Card data={val} key={val?._id} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
