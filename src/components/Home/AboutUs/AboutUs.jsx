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
          duration={0.6}
          delay={200}
          className={`${styles.title} `}
          text={data?.title}
        />
        <Aos
          activeClassName={styles.active}
          className={styles.aos}
          triggerOnce
          delay={800}
        >
          <p className={styles.description}> {data?.description}</p>
        </Aos>
      </div>
      <div className={styles.mesh}>
        <Threads color={"#385cf5"} amplitude={2} />
      </div>
    </div>
  );
};

export default AboutUs;
