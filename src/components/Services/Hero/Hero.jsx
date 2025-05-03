"use client";
import styles from "./Hero.module.css";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import Img from "@/components/Shared/img/Img";

const Hero = ({ data = {} }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <h1 className={styles.title}>{data?.title}</h1>
          <p className={styles.subtitle}>{data?.description}</p>
        </div>
        <div className=" p-relative ">
          <Img
            alt="Services"
            className={styles.poster}
            url="https://res.cloudinary.com/dsed1slaz/image/upload/v1746294755/Edge-108_xthmz1.jpg"
          />

          <div className={styles.arrowTag}>
            <div className={styles.iconCover}>
              <img
                width="100"
                height="100"
                src="https://img.icons8.com/ios-filled/100/globe--v1.png"
                alt="globe--v1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
