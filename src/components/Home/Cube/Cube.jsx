"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cube";

import styles from "./Cube.module.css";
import Card from "./Card/Card";
import SectionTitle from "@/components/SectionTitle/SectionTitle";

const Cube = ({ data = {} }) => {
  const swiperRef = useRef(null);
  const members = data?.members || [];

  // Start with right arrow visible
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDir = (direction) => {
    if (!swiperRef.current) return;

    if (direction === "left") {
      swiperRef.current.slidePrev();
    } else if (direction === "right") {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className={styles.container}>
      <SectionTitle title={data?.title} className={styles.title} />
      <div className={styles.cubeWrapper} style={{ position: "relative" }}>
        <div key={activeIndex} className={styles.descriptionBox}>
          <h4>{members[activeIndex]?.jobTitle}</h4>
          <p>{members[activeIndex]?.description}</p>
        </div>

        <div className="flex al-i-c gap10 w-100" style={{ alignItems: "center", gap: "10px", width: "100%" }}>
          {/* Left button: only visible if activeIndex is 1 */}
          <button
            onClick={() => handleDir("left")}
            className={styles.navButton}
            style={{ display: activeIndex === 1 ? "inline-flex" : "none" }}
            aria-label="Previous"
          >
            ‹
          </button>

          <Swiper
            effect="cube"
            grabCursor={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            modules={[EffectCube]}
            className={styles.mySwiper}
            slidesPerView={1}
            allowTouchMove={false} // optional
          >
            {members?.map((member, i) => (
              <SwiperSlide key={i} className={styles.slide}>
                <Card member={member} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right button: only visible if activeIndex is 0 */}
          <button
            onClick={() => handleDir("right")}
            className={styles.navButton}
            style={{ display: activeIndex === 0 ? "inline-flex" : "none" }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cube;
