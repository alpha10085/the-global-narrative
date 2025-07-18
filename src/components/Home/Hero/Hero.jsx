import styles from "./Hero.module.css";
import Img from "@/components/Shared/img/Img";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import MainButton from "@/components/MainButton/MainButton";
import Media from "@/components/Shared/Media/Media";
import ShinyText from "@/components/Shared/Animtions/ShinyText/ShinyText";
import { videoKey } from "@/components/NavBar/helpers";
const Hero = ({ data = {} }) => {
  const mediaData = { ...data?.media, thumbnail: data?.thumbnail?.url };

  return (
    <div className={styles.container}>
      <div className={styles.slide}>
        <Media
          {...mediaData}
          allowChangeSound
          videoKey={videoKey}
          className={`${styles.media} imageoverlay`}
        />
        <div className={`${styles.titleBox} flex-c column gap15`}>
          {/* <ShinyText
            text={data?.title}
            disabled={false}
            speed={8}
            className={`flex-c ${styles.title}`}
          /> */}
          {/* <WordPullUpV2
            duration={0.5}
            delay={500}
            className={`flex-c ${styles.title}`}
            text={data?.title}
          />
          <p className={styles.description}>{data?.description}</p> */}
          <div className={styles.link}>
            <MainButton text={data?.button?.label} href="/contact-us" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
