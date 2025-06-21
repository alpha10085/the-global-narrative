import React from "react";
import styles from "./Card.module.css";
import Img from "@/components/Shared/img/Img";

const Card = ({ data = {} }) => {
  return (
    <div
      className={`flex  ${styles.card} just-sb   al-i-c`}
      style={{ position: "relative" }}
    >
      <div className={styles.descriptionBox}>
          <h1
          className={styles.name}
          >{data?.name}</h1>
          <h4>{data?.jobTitle}</h4>
        <p>{data?.description}</p>
      </div>

      <Img className={styles.image} url={data?.image?.url} alt={data?.name} />
    </div>
  );
};

export default Card;
