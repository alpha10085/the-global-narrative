import styles from "./Card.module.css";

const Card = ({delay = 0, className = "", data = {}, index = 1 }) => {
  return (
    <div 
    style={{
      animationDelay: `${delay}s`,
    }}
    className={`${styles.container} ${className} flex column  gap30  `}>
      <h1 className={styles.title}>0{index}</h1>
      <p className={styles.description}>{data?.description}</p>
    </div>
  );
};

export default Card;
