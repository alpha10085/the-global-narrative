import Card from "./Card/Card";
import styles from "./News.module.css";

const News = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{data?.title}</h1>
      <div className={`${styles.list} flex mt-30 gap20 al-i-c`}>
        {data?.posts?.map((item, index) => (
          <Card data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default News;
