import Img from "@/components/Shared/img/Img";
import styles from "./Card.module.css";
import Aos from "@/components/Shared/Animtions/Aos/Aos";

const Card = ({
  className = "",
  index = 0,
  title = "",
  description = "",
  poster = {},
}) => {
  console.log("🚀 ~ Card ~ poster:", poster);
  return (
    <Aos
      activeClassName={styles.active}
      style={{
        transitionDelay: `${index * 0.2}s`,
      }}
      className={`flex ${styles.container} ${className} al-i-c`}
    >
      <div className={`${styles.content} flex column gap15 `}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </Aos>
  );
};

export default Card;
