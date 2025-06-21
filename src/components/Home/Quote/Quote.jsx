import Link from "@/components/Shared/Link/Link";
import Img from "@/components/Shared/img/Img";
import styles from "./Quote.module.css";
import { ArrowOutwardIcon } from "../icons";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";

const Quote = ({ data = {} }) => {
  const { title, content, poster } = data;

  return (
    <section className={styles.section}>
      <div className={styles.imageWrapper}>
        <Img
          url={poster?.url}
          alt={title}
          className={styles.imageWrapper}
          mainClassName=""
        />
        <div className={styles.overlay}>
          <div className={styles.content}>
            {title && (
              <WordPullUpV2
                duration={0.6}
                delay={200}
                className={`${styles.title} `}
                text={title}
              />
            )}
            {content && (
              <WordPullUpV2
                duration={0.6}
                delay={200}
                className={`${styles.description} `}
                text={content}
              />
            )}

            <Link href={"/about-us"} className={styles.linkButton}>
              Learn More <ArrowOutwardIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;
