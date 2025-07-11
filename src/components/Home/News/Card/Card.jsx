import Img from "@/components/Shared/img/Img";
import styles from "./Card.module.css";
import { formatDate } from "@/utils/date";
import { customText } from "@/utils/text";
import LinkTransition from "@/components/Shared/LinkTransition/LinkTransition";

const Card = ({ delay = 0, className = "", data = {} }) => {
  return (
    <LinkTransition
      style={{
        animationDelay: `${delay}s`,
      }}
      data-cursor-label="Read More →"
      href={`/news/${data?.slug}`}
      className={`${styles.container} ${className}`}
    >
      <Img className={styles.cover} url={data?.poster?.url} />
      <div className={`${styles.content} flex   w-100 column mt-20`}>
        <div className={`${styles.left} flex just-sb  gap5 `}>
          <h3 className={styles.date}>{formatDate(data?.date)}</h3>
        </div>

        <h1 className={`${styles.title} mt-5 `}>
          {customText(data?.title, 40)}
        </h1>
      </div>
    </LinkTransition>
  );
};

export default Card;
