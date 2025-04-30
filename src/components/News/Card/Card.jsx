import { formatDate } from "@/utils/date";
import styles from "./Card.module.css";
import Img from "@/components/Shared/img/Img";

const Card = ({ product = {}, className = "", latest = false }) => {
  return (
    <div className={`${latest ? styles.latestCard : styles.card}`}>
      <div className={styles.top}>
        <div className={styles.cardOverlay}> </div>
        <Img url={product?.poster?.url} className={styles.image} />
        <div className={styles.text}>
          <p className={styles.date}>{formatDate(product?.createdAt)}</p>
          <h1 className={styles.cardTitle}> {product?.title}</h1>
        </div>
      </div>

      <div className={styles.cardDetails}>
        <h2>{product?.description}</h2>
      </div>
    </div>
  );
};

export default Card;
