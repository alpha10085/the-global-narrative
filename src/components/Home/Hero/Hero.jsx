"use client";
import styles from "./Hero.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Img from "@/components/Shared/img/Img";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import { useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
const Hero = ({ data = [] }) => {
  const [swiperSection, setSwiperSection] = useState(0);
  const swiperRef = useRef(null);
  const slideTo = (i = 0) => {
    swiperRef.current.swiper.slideTo(i);
  };
  return (
    <div className={styles.container}>
      <Swiper
        ref={swiperRef}
        onSlideChange={(e) => setSwiperSection(e.realIndex)}
        className={`${styles.swiper}   `}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={false}
        modules={[Autoplay]}
      >
        {data?.map((val, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div className={styles.slide}>
              <Media
                {...val.media}
                className={`${styles.media} imageoverlay`}
              />
              <div className={styles.titleBox}>
                <WordPullUpV2
                  triggerOnce={false}
                  duration={0.6}
                  delay={500}
                  className={styles.title}
                  text={val?.title}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={`${styles.controlBox} flex al-i-c just-sb`}>
        <span
          onClick={() => slideTo(swiperSection - 1)}
          className={`${styles.arrow} ${
            swiperSection - 0 === 0 ? styles.disabled : ""
          } ${styles.left} flex-c`}
        >
          <ArrowBackIosNewIcon />
        </span>
        <div className={`${styles.points} flex gap15`}>
          {data?.map((val, i) => (
            <div
              key={i}
              className={`${styles.point} ${
                swiperSection === i ? styles.active : ""
              }`}
            />
          ))}
        </div>
        <span
          onClick={() => slideTo(swiperSection + 1)}
          className={`${styles.arrow}
        ${swiperSection + 1 === data?.length ? styles.disabled : ""}
        ${styles.right} flex-c`}
        >
          <ArrowForwardIosIcon />
        </span>
      </div>
    </div>
  );
};

const Media = (props = {}) => {
  const { mimetype = "image" } = props;
  if (mimetype === "image") return <Img 
  disableSkeleton
  {...props} />;
  if (mimetype === "video") return <div>video player</div>;
  return null;
};

export default Hero;
