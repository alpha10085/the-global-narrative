"use client";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // ⬅️ Add Autoplay
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Testimonials.module.css";
import Card from "./Card/Card";
import {
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";

const Testimonials = ({ data = {} }) => {
  const swiperRef = useRef(null);
  const testimonials = data?.testimonials || [];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleChange = (dir) => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper;
    if (dir === "up") swiper.slidePrev();
    else swiper.slideNext();
  };

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.wrapper}>
        {/* LEFT COLUMN */}
        <div className={`${styles.left} ${inView ? styles.animateLeft : ""}`}>
          <div className={`${styles.head} flex  column`}>
            <h2>
              {data?.title || "From our"} <strong>community.</strong>
            </h2>
            <p>Here’s what other subscribers had to say about CC Plus.</p>
          </div>
          <div className={styles.buttons}>
            <button className="flex-c" onClick={() => handleChange("up")}>
              <ArrowUpIcon />
            </button>
            <button className="flex-c" onClick={() => handleChange("down")}>
              <ArrowDownIcon />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={`${styles.right} ${inView ? styles.animateRight : ""}`}>
          <Swiper
            direction="vertical"
            modules={[Navigation, Autoplay]}
            ref={swiperRef}
            className={styles.swiper}
            loop
            autoplay={{
              delay: 4000, // 4 seconds between slides
              disableOnInteraction: false, // keep autoplay after user interaction
              pauseOnMouseEnter: true, // pause on hover
            }}
          >
            {testimonials?.map((item) => (
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
