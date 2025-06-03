import Img from "@/_components/Shared/img/Img";
import styles from "./Card.module.css";

const Card = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <Img className={styles.poster} url={data?.image?.url} />
      <h1 className={styles.name}>{data?.name}</h1>
      <h2 className={styles.jobTitle}>{data?.jobTitle}</h2>
    </div>
  );
};

export default Card;
