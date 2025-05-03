"use client";
import styles from "./Hero.module.css";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import Img from "@/components/Shared/img/Img";

const Hero = ({data = {}}) => {
  return (
    <div className={styles.hero}>
      <div className={styles.text}>
      <h1 className={styles.title}>{data?.title}</h1>
      <p className={styles.subtitle}>{data?.description}</p>
      </div>
      <Img
        alt="Services"
        className={styles.poster}
        url="https://res.cloudinary.com/dsed1slaz/image/upload/v1746235167/pexels-padrinan-2882669_vvtl5x.jpg"
      />

      <div className={styles.arrowTag}>
        <div className={styles.iconCover}>
          <ArrowDownwardRoundedIcon />
        </div>
      </div>
    </div>
  );
};

export default Hero;
