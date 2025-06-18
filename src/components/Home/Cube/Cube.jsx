"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import styles from "./Cube.module.css";
import Card from "./Card/Card";
import SectionTitle from "@/components/SectionTitle/SectionTitle";

const Cube = ({ data = {} }) => {
  const swiperRef = useRef(null);
  const members = data?.members || [];


  // Auto-slide manually every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!swiperRef.current) return;
      const swiper = swiperRef.current;

      if (swiper?.activeIndex === members.length - 1) {
        swiper.slideTo(0); 
      } else {
        swiper.slideNext();
      }
    }, 6000); // 6 seconds

    return () => clearInterval(interval);
  }, [members.length]);

  return (
    <div className={styles.cubeWrapper}>
      <SectionTitle title={data?.title} className={styles.title} />

      <Swiper
        effect="cube"
        grabCursor={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination]}
        className={styles.mySwiper}
      >
        {members?.map((member, i) => (
          <SwiperSlide key={i}>
            <Card member={member} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cube;
