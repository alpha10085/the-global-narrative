import styles from "./Hero.module.css";
import Img from "@/components/Shared/img/Img";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import MainButton from "@/components/MainButton/MainButton";
const Hero = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <div className={styles.slide}>
        <Media {...data?.media} className={`${styles.media} imageoverlay`} />
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

const Media = (props = {}) => {
  const { mimetype = "image" } = props;
  if (mimetype === "image") return <Img disableSkeleton {...props} />;
  if (mimetype === "video") return <div>video player</div>;
  return null;
};

export default Hero;
