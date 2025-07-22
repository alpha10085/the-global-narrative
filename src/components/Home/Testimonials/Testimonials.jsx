"use client";
import { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Testimonials.module.css";
import Card from "./Card/Card";
import {
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import Img from "@/components/Shared/img/Img";

const Testimonials = ({ data = {} }) => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [avatarsDir, setAvatarsDir] = useState("right");
  const lastScrollLeft = useRef(0);

  const sliderRef = useRef();
  const swiperRef = useRef(null);
  const testimonials = data?.testimonials || [];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });


  const slideTo = (i = 0) => {
    swiperRef.current.swiper.slideTo(i);
  };

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = 420;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Detect scroll direction and end of scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;

      // Scroll direction
      if (scrollLeft > lastScrollLeft.current) setAvatarsDir("right");
      else if (scrollLeft < lastScrollLeft.current) setAvatarsDir("left");

      lastScrollLeft.current = scrollLeft;
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  const cards = testimonials;
  if (cards?.length === 0) return null

  return (
    <div className={styles.container} ref={ref}>
      {/* Top Content */}
      <div className={styles.wrapper}>
        {/* LEFT COLUMN */}
        <div className={`${styles.left} ${inView ? styles.animateLeft : ""}`}>
          <div className={`${styles.head} flex column`}>
            <h2 className="title-l">
              {data?.title || "From our"}
            </h2>
            <p className="description-sm">
             Real stories from our community around the world.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={`${styles.right} ${inView ? styles.animateRight : ""}`}>
          <Swiper
            onSlideChange={(e) => setSwiperIndex(e.realIndex)}
            modules={[Navigation, Autoplay]}
            ref={swiperRef}
            className={styles.swiper}
            speed={1200}
            loop
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item?._id}>
                <Card item={item} isActive={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Bottom Content */}
      <div className={`${styles.bottom} gap10 flex al-i-c`}>
        {cards.length > 6 && (
          <div
            onClick={() => scroll("left")}
            className={`flex-c ${styles.ArrowBackIosIcon}`}
          >
            <ArrowBackIosIcon />
          </div>
        )}

        <div ref={sliderRef} className={`${styles.cards} gap10 flex al-i-c`}>
          {cards.map((item, i) => (
            <Img
              key={i}
              url={item?.poster?.url}
              alt={item?.author}
              className={`${styles.avatar} ${
                swiperIndex === i && styles.active
              }`}
              onClick={() => slideTo(i)}
            />
          ))}
        </div>

        {cards.length > 6 && (
          <div
            onClick={() => scroll("right")}
            className={`flex-c ${styles.ArrowForwardIosIcon}`}
          >
            <ArrowForwardIosIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
