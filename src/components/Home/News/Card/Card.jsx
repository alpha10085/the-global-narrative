import Img from "@/components/Shared/img/Img";
import styles from "./Card.module.css";
import Link from "@/components/Shared/LocalizedLink/Link";
import { formatDate } from "@/utils/date";
import { customText } from "@/utils/text";
import { ArrowOutwardIcon } from "../../icons";
import Aos from "@/components/Shared/Animtions/Aos/Aos";

const Card = ({ delay = 0, className = "", data = {} }) => {
  return (
    <Link
      style={{
        animationDelay: `${delay}s`,
      }}

             data-cursor-label="Read More →"
 
      href={`/news/${data?.slug}`}
      className={`${styles.container} ${className}`}
    >
      <Img className={styles.cover} url={data?.poster?.url} />
      <div className={`${styles.content} flex  al-i-c  w-100 just-sb mt-10`}>
        <div className={`${styles.left} flex column gap5 `}>
          <h3 className={styles.date}>{formatDate(data?.date)}</h3>
          <h1 className={styles.title}>{customText(data?.title, 40)}</h1>
        </div>

        <div className={`${styles.right} flex-c `}>
          <ArrowOutwardIcon />
        </div>
      </div>
    </Link>
  );
};

export default Card;
