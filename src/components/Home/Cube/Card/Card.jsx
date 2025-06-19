import React from "react";
import styles from "./Card.module.css";
import Img from "@/components/Shared/img/Img";

const Card = ({ member = {} }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.angleContainer}>
          <Img
            className={styles.image}
            url={member?.image?.url}
            alt={member?.name}
          />
          <div className={styles.text}>
            <h1 className={styles.name}>{member?.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Card;
