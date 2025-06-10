import Img from "@/componentss/Shared/img/Img";
import styles from "./Card.module.css";
import Aos from "@/componentss/Shared/Animtions/Aos/Aos";

const Card = ({ className = "", data = {}, index = 1 }) => {
  return (
    <Aos
      triggerOnce
      threshold={0.15}
      activeClassName={styles.active}
      className={`${styles.container}   ${className} `}
    >
      <div className={`flex al-i-c gap30 ${styles.wrapper}`}>


      <div className={`${styles.content} just-c column gap15 flex`}>
        <div className={`${styles.head} flex column gap10`}>
          <h1 className={styles.index}>0{index}</h1>
          <h1 className={styles.title}>{data?.title}</h1>
        </div>
        <p className={styles.description}>{data?.description}</p>
      </div>

      <Img url={data?.poster?.url} className={styles.poster} />
      </div>
    </Aos>
  );
};

export default Card;
