import SectionTitle from "../SectionTitle/SectionTitle";
import Card from "./Card/Card";
import styles from "./News.module.css";

const News = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <SectionTitle title={data?.title} />
      <div className={`${styles.list} flex mt-30 gap20 al-i-c`}>
        {data?.posts?.map((item, index) => (
          <Card data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default News;
