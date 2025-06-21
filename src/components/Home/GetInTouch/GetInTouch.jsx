import Img from "@/components/Shared/img/Img";
import SectionTitle from "../../SectionTitle/SectionTitle";
import styles from "./GetInTouch.module.css";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import MainLink from "@/components/MainLink/MainLink";

const GetInTouch = ({ data = {} }) => {
  return (
    <div className={`${styles.container} flex al-i-c`}>
      <div className={`${styles.left} flex column gap20`}>
        <SectionTitle title={data?.title} className={styles.title} />
        <Aos delay={400} activeClassName={styles.active} className={styles.aos}>
          <p className={styles.description}>{data?.description}</p>
        </Aos>
        <Aos
          delay={800}
          activeClassName={styles.active}
          className={`${styles.aos} flex gap10 al-i-c`}
        >
          <MainLink text="Contact us" href={"/contact-us"} className={styles.link} />
        </Aos>
      </div>
      <Aos
        delay={800}
        activeClassName={styles.active}
        className={`${styles.aosPoster} `}
      >
        <Img className={styles.poster} url={data?.poster?.url} />
      </Aos>
    </div>
  );
};

export default GetInTouch;
