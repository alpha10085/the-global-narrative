import Link from "@/components/Shared/Link/Link";
import styles from "./AboutUs.module.css";
import { ArrowOutwardIcon } from "../icons";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import Aos from "@/components/Shared/Animtions/Aos/Aos";

const AboutUs = ({ data = {} }) => {
  return (
    <div
      id="active-section"
      data-offset="0"
      className={`${styles.container} flex just-c gap20 column`}
    >
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
      <Aos
        activeClassName={styles.active}
        className={styles.aosBtn}
        triggerOnce
        delay={800}
      >
        <Link href={"/about-us"} className={`${styles.link} flex-c   column`}>
          <span> About</span>
          <span> US</span>

          <div className={styles.arrowWrapper}>
            <span className={`${styles.arrow} flex-c`}>
              <ArrowOutwardIcon />
            </span>
          </div>
        </Link>
      </Aos>
    </div>
  );
};

export default AboutUs;
