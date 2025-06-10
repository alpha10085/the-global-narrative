import styles from "./Card.module.css";

const Card = ({ index = 0, data = {} }) => {
  return (
    <div className={`${styles.container} flex al-i-fs w-100 just-sb`}>
      <div className={`${styles.left} flex gap50`}>
        <h1>0{index}</h1>
        <h1>{data?.title}</h1>
      </div>
      <div className={styles.right}>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default Card;
