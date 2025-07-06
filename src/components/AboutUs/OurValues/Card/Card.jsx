import React from "react";
import styles from "./Card.module.css";
import Img from "@/components/Shared/img/Img";
import Aos from "@/components/Shared/Animtions/Aos/Aos";

const Card = ({ data = {} }) => {
  return (
    <Aos
      threshold={0.6}
      delay={200}
      activeClassName={styles.active}
      className={`flex  ${styles.card} just-sb   al-i-c`}
      style={{ position: "relative" }}
    >
      <div className={styles.descriptionBox}>
        <h1 className={` 
          title-l
          ${styles.name}`}>{data?.title}</h1>
        <p
        className="description-sm"
        >{data?.description}</p>
      </div>

      <Img className={styles.image} url={data?.poster?.url} alt={data?.name} />
    </Aos>
  );
};

export default Card;
