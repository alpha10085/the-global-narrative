import styles from "./OurValues.module.css";
import Card from "./Card/Card";

const OurValues = ({ data = {} }) => {
  return (
    <div id="templateSection" className={styles.container}>
      <div className={styles.sections}>
        {data?.services?.map((val, index) => (
          <Card
            className={styles.card}
            delay={index * 0.2 + 0.2}
            index={index + 1}
            data={val}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default OurValues;
