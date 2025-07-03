import Img from "@/components/Shared/img/Img";
import styles from "./Card.module.css";

const Card = ({ title = "", description = "", poster = {} }) => {
  return (
    <div className={`flex ${styles.container} al-i-c`}>
     
      <div className={`${styles.content} flex column gap15 `}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
