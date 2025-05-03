import Link from "@/components/Shared/LocalizedLink/Link";
import styles from "./AboutUs.module.css";
import { ArrowOutwardIcon } from "../icons";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";

const AboutUs = ({ data = {} }) => {
  return (
    <div className={`${styles.container} flex just-c gap20 column`}>
      <WordPullUpV2
        duration={0.6}
        delay={200}
        className={`${styles.title} `}
        text={data?.title}
      />
      <p className={styles.description}> {data?.description}</p>

      <Link href={"/about-us"} className={`${styles.link} flex-c   column`}>
        <span> explore</span>
        <span> Who US</span>

        <div className={styles.arrowWrapper}>
          <span className={`${styles.arrow} flex-c`}>
            <ArrowOutwardIcon />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default AboutUs;
