"use client";

import { useState } from "react";
import styles from "./CoreValues.module.css";
import Section from "./Section/Section";
import { OrbitingCirclesDemo } from "./OrbitingCirclesDemo/OrbitingCirclesDemo";
import ShadowBg from "@/components/ShadowBg/ShadowBg";
import SectionHead from "@/components/Home/SectionHead/SectionHead";
import Popup from "./Popup/Popup";

const CoreValues = ({ data = {} }) => {
  const [activeIndex, setActiveIndex] = useState(data?.points[0]?._id);

  const circleColors = ["white", "green", "blue", "orange", "purple"];

  const activeColor = circleColors[activeIndex] || "white";

  return (
    <section className={styles.section}>
      <SectionHead
        description={data?.description}
        title={data?.title}
        centerMode
        className_title={styles.title}
        emoji="/laptop_1f4bb.png"
      />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/* Values List */}
          <div className={styles.valuesList}>
            {data?.points?.map((value, index) => (
              <Section
                key={index}
                activeIndex={activeIndex}
                index={index}
                value={value}
                callBack={setActiveIndex}
              />
            ))}
          </div>
          <div className={styles.diagramContainer}>
            {/* Shadow Background */}
            <ShadowBg
              className={styles.background}
              color={
                data?.points?.find((value, index) => value?._id === activeIndex)
                  ?.color
              }
            />
            <OrbitingCirclesDemo
              activeIndex={activeIndex}
              data={data}
              activeColor={activeColor}
            />
          </div>
        </div>
        <div className={styles.popup}>
          <Popup activeIndex={activeIndex} data={data} />
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
