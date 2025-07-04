"use client";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import SectionTitle from "../../SectionTitle/SectionTitle";
import Card from "./Card/Card";
import styles from "./News.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef, useEffect } from "react";

const News = ({ data = {} }) => {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (!swiperInstance || !swiperInstance.autoplay) return;

    // Initially stop autoplay
    swiperInstance.autoplay.stop();

    const isInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const startAutoplayIfNeeded = () => {
      if (
        window.innerWidth > 550 &&
        containerRef.current &&
        isInViewport(containerRef.current)
      ) {
        swiperInstance.autoplay.start();
      } else {
        swiperInstance.autoplay.stop();
      }
    };

    // IntersectionObserver to trigger autoplay when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAutoplayIfNeeded();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Resize listener
    window.addEventListener("resize", startAutoplayIfNeeded);

    return () => {
      window.removeEventListener("resize", startAutoplayIfNeeded);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="active-section"
      data-offset="0"
      className={styles.container}
      ref={containerRef}
    >
      <div className={styles.title}>
        <SectionTitle title={data?.title} />
      </div>
      <Aos
        delay={200}
        threshold={0.2}
        activeClassName={styles.active}
        className={`${styles.list} flex gap20 al-i-c`}
      >
        <Swiper
          ref={swiperRef}
          className={styles.swiper}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={2000}
          loop={true}
          slidesPerView={1.2}
          spaceBetween={40}
          initialSlide={2}
          breakpoints={{
            550: { slidesPerView: 2 },
            768: { slidesPerView: 2.2 },
            990: { slidesPerView: 2.8 },
            1100: { slidesPerView: 3.2 },
            1300: { slidesPerView: 3.6 },
          }}
          modules={[Autoplay]}
        >
          {[...data?.news, ...data?.news, ...data?.news]?.map((item, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <Card
                className={styles.card}
                delay={index * 0.2 + 0.4}
                data={item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Aos>
    </div>
  );
};

export default News;
