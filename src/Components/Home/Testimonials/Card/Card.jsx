import Img from "@/Components/Shared/img/Img";
import styles from "./Card.module.css";
import { customText } from "@/utils/text";

const Card = ({ delay = 0, className = "", data }) => {
  return (
    <div
      data-cursor-label="← DRAG →"
      style={{
        animationDelay: `${delay}s`,
      }}
      className={`${styles.container}  ${className}`}
    >
      <div className={`${styles.head} flex column just-sb`}>
        <div className={`${styles.left} gap5 flex column`}>
          <h1 className={styles.author}>@{data?.author}</h1>
          <p className={styles.jobtitle}>{customText(data?.jobTitle, 40)}</p>
        </div>
        <Img className={styles.poster} url={data?.poster?.url} />
        <div className={`${styles.triangles} flex gap5`}>
          <Img className={styles.triangle} url={"/Testimonials-assets.png"} />
          <Img className={styles.triangle} url={"/Testimonials-assets.png"} />
        </div>
      </div>

      <p className={`${styles.content} `}>{data?.content}</p>
    </div>
  );
};

export default Card;
