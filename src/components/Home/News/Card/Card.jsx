import Img from "@/components/Shared/img/Img";
import styles from "./Card.module.css";

const Card = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <Img className={styles.cover} url={data?.cover?.url} />
    </div>
  );
};

export default Card;
