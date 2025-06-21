import Img from "@/components/Shared/img/Img";
import styles from "./Card.module.css";

const Card = ({ item, isActive }) => {
  if (!item) return null;

  return (
    <div
      className={`${styles.card} flex column gap20 just-c ${isActive ? styles.active : styles.inactive}`}
    >
      <div className={styles.author}>
        <Img
          url={item?.poster?.url}
          alt={item?.author}
          className={styles.avatar}
        />
        <div>
          <p className={styles.name}>{item?.author}</p>
          <p className={styles.title}>{item?.jobTitle}</p>
        </div>
      </div>
      <p className={styles.quote}>“{item?.content}”</p>
    </div>
  );
};

export default Card;
