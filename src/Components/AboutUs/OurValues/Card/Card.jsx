import styles from "./Card.module.css";

const Card = ({ className = "", index = 0, data = {} }) => {
  console.log(`${((index - 1) * 0.15).toFixed(1)}s`);
  
  return (
    <div
      style={{
        transitionDelay:`${((index - 1) * 0.5).toFixed(1)}s`,
      }}
      className={`${styles.container} 
      ${className}
      flex al-i-fs w-100 just-sb`}
    >
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
