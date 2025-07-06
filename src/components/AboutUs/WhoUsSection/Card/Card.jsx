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
      <div className={`
        flex column gap5
        ${styles.descriptionBox}`}>
        <h1 className={`${styles.name} title-l`}>{data?.name}</h1>
        <h4
        className="title-s"
        >{data?.jobTitle}</h4>
        <p
        className="description-sm"
        >{data?.description}</p>
      </div>

      <Img className={styles.image} url={data?.image?.url} alt={data?.name} />
    </Aos>
  );
};

export default Card;
