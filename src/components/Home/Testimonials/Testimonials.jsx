import Aos from "@/components/Shared/Animtions/Aos/Aos";
import SectionTitle from "../../SectionTitle/SectionTitle";
import Card from "./Card/Card";
import styles from "./Testimonials.module.css";

const Testimonials = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <SectionTitle title={data?.title} />
      <Aos
        delay={500}
        activeClassName={styles.active}
        className={`${styles.list} mt-15 flex gap25`}
      >
        {data?.posts?.map((val, index) => (
          <Card
            className={styles.card}
            delay={index * 0.2 + 0.2}
            data={val}
            key={val?._id}
          />
        ))}
      </Aos>
    </div>
  );
};

export default Testimonials;
