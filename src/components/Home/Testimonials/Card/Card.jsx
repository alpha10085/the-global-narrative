import Img from "@/components/Shared/img/Img";
import styles from "./Card.module.css";

const Card = ({ delay = 0, className = "", data }) => {
  return (
    <div
      style={{
        animationDelay: `${delay}s`,
      }}
      className={`${styles.container}  ${className}`}
    >
      <div className={styles.head}>
        <div className={`${styles.left} gap5 flex column`}>
          <h1 className={styles.author}>@{data?.author}</h1>
          <p className={styles.jobtitle}>{data?.jobTitle}</p>
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
