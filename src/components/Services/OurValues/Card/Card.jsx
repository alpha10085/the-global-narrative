import Img from "@/components/Shared/img/Img";
import styles from "./Card.module.css";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import { lineBreak } from "@/utils/text";

const Card = ({ className = "", data = {}, index = 1 }) => {
  return (
    <div
      triggerOnce
      threshold={0.15}
      activeClassName={styles.active}
      className={`${styles.container} ${styles.active}  ${className} `}
    >
      <div id={`id_${data?._id}`} className={`flex ${styles.wrapper}`}>
        <div className={`${styles.content}  column gap15 flex`}>
          <div className={`${styles.head} flex column gap10`}>
            <h1 className={styles.title}>{data?.title}</h1>
            <h1 className={styles.subTitle}>{data?.subTitle}</h1>
          </div>
          <div className={`${styles.description} gap10 flex column`}>
            {lineBreak(data?.description).map((val, i) => (
              <p key={i}>{val}</p>
            ))}
          </div>
          <div className={`${styles.keypoints} flex column gap20`}>
            {lineBreak(data?.keyPoints,true)?.slice(0,5).map((val) => (
              <div className={styles.point}>{val}</div>
            ))}
          </div>
        </div>
        <div className={styles.posterWrapper}>
          <Img url={data?.poster?.url} className={styles.poster} />
          <h1 className={styles.subTitlePoster}>{data?.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
