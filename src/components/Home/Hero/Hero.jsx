"use client";
import styles from "./Hero.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import Img from "@/components/Shared/img/Img";
import WordPullUp from "@/components/Shared/Animtions/WordPullUp/WordPullUp";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Hero = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <Swiper
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        keyboard={true}
        navigation={false}
        modules={[Navigation, Pagination, Mousewheel]}
        className={`${styles.swiper}   `}
      >
        {data?.map((val, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div className={styles.slide}>
              <Media
                {...val.media}
                className={`${styles.media} imageoverlay`}
              />
              <div className={styles.titleBox}>
                <WordPullUp
                  duration={0.4}
                  className={styles.title}
                  text={val?.title}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={`${styles.controlBox} flex al-i-c just-sb`}>
        <span className={`${styles.arrow} ${styles.left} flex-c`}>
          <ArrowBackIosNewIcon />
        </span>
        <div className={`${styles.points} flex gap15`}>
          {Array.from({
            length: 5,
          }).map((val, i) => (
            <div key={i} className={styles.point} />
          ))}
        </div>
        <span className={`${styles.arrow} ${styles.right} flex-c`}>
          <ArrowForwardIosIcon />
        </span>
      </div>
    </div>
  );
};

const Media = (props = {}) => {
  const { mimetype = "image" } = props;
  if (mimetype === "image") return <Img {...props} />;
  if (mimetype === "video") return <div>video player</div>;
  return null;
};

export default Hero;
