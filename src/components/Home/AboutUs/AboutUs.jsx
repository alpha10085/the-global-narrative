import styles from "./AboutUs.module.css";
import { ArrowOutwardIcon } from "../icons";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import Threads from "@/components/Threads/Threads";

const AboutUs = ({ data = {} }) => {
  return (
    <div
      id="active-section"
      data-offset="0"
      className={`${styles.container}    `}
    >
      <div className={`${styles.top} column flex  gap20  `}>
        <WordPullUpV2
          duration={0.4}
          delay={500}
          className={`${styles.title} title-xl `}
          text={data?.title}
        />
        <Aos
          activeClassName={styles.active}
          className={styles.aos}
          triggerOnce
          delay={700}
        >
          <p className={`description-sm ${styles.description}`}>
            {" "}
            {data?.description}
          </p>
        </Aos>
      </div>
      <Aos
        triggerOnce
        delay={1000}
        activeClassName={styles.active}
        className={`${styles.mesh} ${styles.aos}`}
      >
        <Threads color={"#385cf5"} amplitude={2} distance={0.2} />
      </Aos>
    </div>
  );
};

export default AboutUs;
