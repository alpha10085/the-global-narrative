"use client";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import SectionTitle from "../../SectionTitle/SectionTitle";
import Card from "./Card/Card";
import styles from "./News.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef, useState, useEffect } from "react";

const News = ({ data = {} }) => {
  const swiperRef = useRef(null);


  // 👇 Stop autoplay if screen width <= 550px
  useEffect(() => {
    const handleResize = () => {
      const swiperInstance = swiperRef.current?.swiper;
      if (!swiperInstance || !swiperInstance.autoplay) return;

      if (window.innerWidth <= 550) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <SectionTitle title={data?.title} />
      </div>
      <Aos
        delay={500}
        activeClassName={styles.active}
        className={`${styles.list} flex mt-30 gap20 al-i-c`}
      >
        <Swiper
          ref={swiperRef}
          className={styles.swiper}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={1000}
          loop={true}
          slidesPerView={1.1}
          spaceBetween={10}
          breakpoints={{
            550: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            990: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1100: {
              slidesPerView: 3.4,
              spaceBetween: 10,
            },
            1300: {
              slidesPerView: 3.4,
              spaceBetween: 10,
            },
          }}
          modules={[Autoplay]}
        >
          {[...data?.posts, ...data?.posts, ...data?.posts]?.map(
            (item, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <Card
                  className={styles.card}
                  delay={index * 0.2 + 0.2}
                  data={item}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </Aos>
    </div>
  );
};

export default News;
