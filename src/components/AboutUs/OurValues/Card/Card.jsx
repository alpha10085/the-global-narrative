import styles from "./Card.module.css";

const Card = ({ data = {}, index = 1 }) => {
  return (
    <div className={`${styles.container} flex column  gap30  `}>
      <h1 className={styles.title}>0{index}</h1>
      <p className={styles.description}>{data?.description}</p>
    </div>
  );
};

export default Card;
