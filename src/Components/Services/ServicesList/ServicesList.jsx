"use client";
import { useState } from "react";
import styles from "./ServicesList.module.css";
import FormatText from "@/components/Shared/FormatText/FormatText";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import SectionTitle from "@/components/SectionTitle/SectionTitle";

const ServicesList = ({ data = [] }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div 
    id="templateSection"
    className={styles.container}>
      <div className={styles.head}>
        <SectionTitle title={"our values"} />
      </div>
      <div className={`${styles.servicesList} flex`}>
        {data?.map((service, index) => {
          const isOpen = expanded[index];

          return (
            <Aos
              className={styles.serviceCard}
              activeClassName={styles.active}
              delay={index * 50}
              key={index}
            >
              <h3 className={styles.serviceTitle}>
                &ldquo;{service?.title}&rdquo;
              </h3>
              <p className={styles.serviceIntro}>{service?.intro}</p>

              <div
                className={`${styles.descriptionWrapper} ${
                  isOpen ? styles.expanded : ""
                }`}
              >
                <FormatText
                  className={styles.serviceDescription}
                  text={service?.description}
                />
              </div>

              <button
                onClick={() => toggleExpand(index)}
                className={`flex gap5 al-i-c ${styles.toggleButton}`}
              >
                <span className={`${styles.contnet} flex al-i-c`}>
                  {isOpen ? "Read less" : "Read more"}
                </span>
              </button>
            </Aos>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesList;
