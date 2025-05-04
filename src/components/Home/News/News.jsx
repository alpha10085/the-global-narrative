import Aos from "@/components/Shared/Animtions/Aos/Aos";
import SectionTitle from "../../SectionTitle/SectionTitle";
import Card from "./Card/Card";
import styles from "./News.module.css";

const News = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <SectionTitle title={data?.title} />
      <Aos
        delay={500}
        activeClassName={styles.active}
        className={`${styles.list} flex mt-30 gap20 al-i-c`}
      >
        {data?.posts?.map((item, index) => (
          <Card
            className={styles.card}
            delay={index * 0.2 + 0.2}
            data={item}
            key={index}
          />
        ))}
      </Aos>
    </div>
  );
};

export default News;
