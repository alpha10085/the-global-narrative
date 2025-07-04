"use client";
import { useRef } from "react";
import styles from "./ServicesSection.module.css";
import ServiceItem from "./ServiceItem/ServiceItem";
import { ArrowBackIosNewIcon, ArrowForwardIosIcon } from "@/components/Home/icons";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Aos from "@/components/Shared/Animtions/Aos/Aos";

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
        <SectionTitle title={data?.title} className={styles.title} />

        {/* Show "Swipe" hint once on mobile */}
        <Aos
          triggerOnce
          threshold={0}
          className={`${styles.hint}`}
          activeClassName={styles.hintActive}
          delay={400}
        >
          <span className={styles.swipeHint}>Swipe →</span>
        </Aos>

        <div className={` flex gap10 ${styles.navButtons} `}>
          <button
            onClick={() => scroll("left")}
            className={`flex-c ${styles.navButton}`}
          >
            <ArrowBackIosNewIcon />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`flex-c ${styles.navButton}`}
          >
            <ArrowForwardIosIcon />
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
