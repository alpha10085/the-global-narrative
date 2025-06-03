import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import styles from "./Hero.module.css";
import Img from "@/Components/Shared/img/Img";

const Hero = ({ data = {} }) => {
  return (
    <div className={`${styles.container} flex al-i-c  gap20`}>
      <div className={`${styles.left} flex mt-50 gap30 column `}>
        <SectionTitle title={data.title} className={styles.title} />
        <p className={styles.description}>{data?.description}</p>
      </div>
      <Img className={styles.poster} url={data?.poster?.url} />
    </div>
  );
};

export default Hero;
