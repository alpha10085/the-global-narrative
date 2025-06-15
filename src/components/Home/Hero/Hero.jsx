import styles from "./Hero.module.css";
import Img from "@/components/Shared/img/Img";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import MainButton from "@/components/MainButton/MainButton";
import Media from "@/components/Shared/Media/Media";
const Hero = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <div className={styles.slide}>
        <Media
        
        {...{...data?.media,thumbnail:data?.thumbnail?.url}}
        
        className={`${styles.media} imageoverlay`} />
        <div className={`${styles.titleBox} flex-c column gap15`}>
          <WordPullUpV2
            duration={0.5}
            delay={500}
            className={`flex-c ${styles.title}`}
            text={data?.title}
          />
          <p className={styles.description}>{data?.description}</p>
          <div 
            className={styles.link}>

          <MainButton
            text="join us"
            href="/join-us"
            />
            </div>
        </div>
      </div>
    </div>
  );
};


export default Hero;
