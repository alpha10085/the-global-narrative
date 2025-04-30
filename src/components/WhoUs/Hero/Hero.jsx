import styles from "./Hero.module.css";
import Img from "@/components/Shared/img/Img";
import { highlightWord } from "@/utils/text";
import ShadowEffect from "./ShadowEffect";

const Hero = ({ data = {} }) => {
  const [titleOne, titleTwo] = data?.title?.split("#/") || ["", ""];

  return (
    <div
      style={{
        height: "100vh",
      }}
      className=""
    >
      <div className={`${styles.container}`}>
        <div
          className={`flex al-i-c gap5 flex-c column wrap ${styles.headBox}`}
        >
          <h1 className={` ${styles.title} intro_title  `}>{titleOne} </h1>

          <h1
            className={`${styles.title} intro_title`}
            dangerouslySetInnerHTML={{
              __html: highlightWord(titleTwo),
            }}
          />
        </div>
        <div className={styles.posterBg}>
          <Img className={styles.poster} url={data?.media?.url} />
        </div>
        <div className={styles.background}></div>
        <ShadowEffect />
      </div>
    </div>
  );
};

export default Hero;
