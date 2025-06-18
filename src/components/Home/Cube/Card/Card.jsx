import React from "react";
import styles from "./Card.module.css";
import Img from "@/components/Shared/img/Img";
import SpotlightCard from "./SpotlightCard/SpotlightCard";

const Card = ({ member = {} }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Img
          className={styles.image}
          url={member?.image?.url}
          alt={member?.name}
        />
      </div>
      <SpotlightCard className={styles.name} text={member?.name} />
      <SpotlightCard className={styles.desc} text={member?.description} />
      <SpotlightCard className={styles.job} text={member?.jobTitle} />
    </div>
  );
};

export default Card;
