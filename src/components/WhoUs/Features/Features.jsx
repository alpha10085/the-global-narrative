import React from "react";
import styles from "./Features.module.css";
import TextRotator from "@/components/Shared/Animtions/TextRotator/TextRotator";
import { Activity, FastIcon, MultiLanguageIcon } from "./Icons";

const Features = ({ data = {} }) => {
  // Dynamically generate textList from data
  const textList = data?.map((feature) => feature?.title);

  const Icons = [FastIcon , MultiLanguageIcon , Activity ];
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1 className={styles.mainWord}>We build </h1>
        <TextRotator
          texts={textList}
          interval={3000}
          className={styles.texts}
        />
      </div>

      <div className={`flex wrap just-sb`}>
        {data?.map((feature, index) => {
          const Icon = Icons?.[index];
          return (
            <div key={index} className={styles.card}>
              <Icon />
              <h2 className={styles.cardTitle}>{feature?.title}</h2>
              <p className={styles.cardDescription}>{feature?.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
