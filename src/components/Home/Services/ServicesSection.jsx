"use client";
import { useRef } from "react";
import styles from "./ServicesSection.module.css";
import ServiceItem from "./ServiceItem/ServiceItem";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";

const ServicesSection = ({ data = {} }) => {
  const sliderRef = useRef();
  let serviceRefs = data?.serviceRefs || [];

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
        <WordPullUpV2
          duration={0.6}
          delay={200}
          className={`${styles.title} `}
          text={data?.title}
        />
        <div className={` flex gap10 ${styles.navButtons} `}>
          <button onClick={() => scroll("left")} className={styles.navButton}>
            ←
          </button>
          <button onClick={() => scroll("right")} className={styles.navButton}>
            →
          </button>
        </div>
      </div>

      <div className={styles.sliderWrapper} ref={sliderRef}>
        <div className={styles.slider}>
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
