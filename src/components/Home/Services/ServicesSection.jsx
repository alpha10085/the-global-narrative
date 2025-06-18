"use client";
import { useState } from "react";
import styles from "./ServicesSection.module.css";
import PosterStack from "./PosterDisplay/PosterStack";
import ServiceItem from "./ServiceItem/ServiceItem";

const ServicesSection = ({ data = {} }) => {
  const serviceRefs = data?.serviceRefs || [];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="active-section"
      data-offset="10"
      className={styles.servicesWrapper}
    >
      <div className={styles.contentArea}>
        {serviceRefs?.map((value, index) => (
          <ServiceItem
            key={value?._id}
            value={value}
            index={index}
            activeIndex={serviceRefs[activeIndex]?._id}
            callBack={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <div className={styles.posterArea}>
        <PosterStack
          posters={serviceRefs?.map((s) => ({
            _id: s._id,
            url: s.poster?.url,
          }))}
        />
      </div>
    </section>
  );
};

export default ServicesSection;
