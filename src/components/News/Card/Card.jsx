import { formatDate } from "@/utils/date";
import styles from "./Card.module.css";
import Img from "@/components/Shared/img/Img";
import Link from "next/link";

const Card = ({ New = {}, className = "", latest = false }) => {
  return (
    <Link className={`${styles.card} ${className}`} href={`/news/${New?.slug}`}>
      <div className={styles.top}>
        <div className={styles.cardOverlay}> </div>
        <Img url={New?.poster?.url} className={styles.image} />
        <div className={styles.text}>
          <p className={styles.date}>{formatDate(New?.createdAt)}</p>
          <h1 className={styles.cardTitle}> {New?.title}</h1>
        </div>
      </div>

      <div className={styles.cardDetails}>
        <h2>{New?.description?.slice(0, 40)}...</h2>{" "}
      </div>
    </Link>
  );
};

export default Card;
