"use client";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styles from "./Testimonials.module.css";
import Card from "./Card/Card";
import { ArrowBackIosNewIcon, ArrowForwardIosIcon } from "../icons";

const Testimonials = ({ data = {} }) => {
  const swiperRef = useRef(null);
  const testimonials = data?.testimonials || [];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleChange = (dir) => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper; // access Swiper instance
    if (dir === "left") swiper.slidePrev();
    else swiper.slideNext();
  };

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.wrapper}>
        {/* LEFT COLUMN */}
        <div className={`${styles.left} ${inView ? styles.animateLeft : ""}`}>
          <h2>
            {data?.title || "From our"} <strong>community.</strong>
          </h2>
          <p>Here’s what other subscribers had to say about CC Plus.</p>
          <div className={styles.buttons}>
            <button className="flex-c" onClick={() => handleChange("left")}>
              <ArrowBackIosNewIcon />
            </button>
            <button className="flex-c" onClick={() => handleChange("right")}>
              <ArrowForwardIosIcon />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={`${styles.right} ${inView ? styles.animateRight : ""}`}>
          <Swiper
            direction="vertical"
            modules={[Navigation]}
            ref={swiperRef}
            className={styles.swiper}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item?._id}>
                <Card item={item} isActive={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
