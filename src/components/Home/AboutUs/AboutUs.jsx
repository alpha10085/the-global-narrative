import styles from "./AboutUs.module.css";
import { ArrowOutwardIcon } from "../icons";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import LinkTransition from "@/components/Shared/LinkTransition/LinkTransition";
import Threads from "@/components/Threads/Threads";

const AboutUs = ({ data = {} }) => {
  return (
    <div
      id="active-section"
      data-offset="0"
      className={`${styles.container} flex  gap20 `}
    >
      <div className={`${styles.top} flex-c  gap20 column `}>
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
        <Threads color={"#385cf5"} amplitude={1.2} />
      </div>
    </div>
  );
};

export default AboutUs;
