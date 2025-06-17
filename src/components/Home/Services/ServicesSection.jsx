"use client";
import { useState } from "react";
import styles from "./ServicesSection.module.css";
import ServiceItem from "./ServiceItem/ServiceItem";
import PosterDisplay from "./PosterDisplay/PosterDisplay";

const ServicesSection = ({ data = {} }) => {
  const serviceRefs = data?.serviceRefs || [];
  const [activeIndex, setActiveIndex] = useState(serviceRefs[0]?._id);

  const activeService = serviceRefs.find((s) => s._id === activeIndex);

  return (
    <section className={styles.servicesWrapper}>
      <div className={styles.contentArea}>
        {serviceRefs.map((value, index) => (
          <ServiceItem
            key={value._id}
            value={value}
            index={index}
            activeIndex={activeIndex}
            callBack={setActiveIndex}
          />
        ))}
      </div>

      <div className={styles.posterArea}>
        <PosterDisplay activePoster={activeService?.poster} />
      </div>
    </section>
  );
};

export default ServicesSection;
