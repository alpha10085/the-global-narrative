import { formatDate } from "@/utils/date";
import styles from "./Card.module.css";
import Img from "@/components/Shared/img/Img";
import Link from "@/components/Shared/Link/Link";
import { customText } from "@/utils/text";
import LinkTransition from "@/components/Shared/LinkTransition/LinkTransition";

const Card = ({ New = {}, className = "", latest = false }) => {
  return (
    <LinkTransition className={`${styles.card} ${className}`} href={`/news/${New?.slug}`}>
      <div className={styles.top}>
        <div className={styles.cardOverlay}> </div>
        <Img url={New?.poster?.url} className={`${styles.image} `} />
        <div className={styles.text}>
          <p className={styles.date}>{formatDate(New?.date)}</p>
          <h1 className={styles.cardTitle}> {customText(New?.title, 80)}</h1>
        </div>
      </div>
    </LinkTransition>
  );
};

export default Card;
