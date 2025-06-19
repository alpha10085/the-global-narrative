"use client";
import { useRef } from "react";
import styles from "./ServicesSection.module.css";
import ServiceItem from "./ServiceItem/ServiceItem";

const ServicesSection = ({ data = {} }) => {
  let serviceRefs = data?.serviceRefs || [];
  const sliderRef = useRef();

  // Add spacer item at the beginning
  serviceRefs = [{ _id: "spacer" }, ...serviceRefs];

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = 400;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="active-section"
      data-offset="10"
      className={styles.servicesWrapper}
    >
      <div className={styles.sliderHeader}>
        <button onClick={() => scroll("left")} className={styles.navButton}>
          ←
        </button>
        <button onClick={() => scroll("right")} className={styles.navButton}>
          →
        </button>
      </div>

      <div className={styles.sliderWrapper} ref={sliderRef}>
        <div className={styles.slider} ref={sliderRef}>
          {serviceRefs?.map((item, index) =>
            item?._id === "spacer" ? (
              <div key="spacer" className={styles.spacer} />
            ) : (
              <ServiceItem item={item} index={index} key={item?._id} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
