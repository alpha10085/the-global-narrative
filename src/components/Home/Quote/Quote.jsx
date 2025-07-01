import Link from "@/components/Shared/Link/Link";
import Img from "@/components/Shared/img/Img";
import styles from "./Quote.module.css";
import { ArrowOutwardIcon } from "../icons";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Quote = ({ data = {} }) => {
  const { title, content, poster, button } = data;

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
                className={`${styles.title}`}
                text={title}
              />
            )}
            {content && (
              <WordPullUpV2
                duration={0.6}
                delay={200}
                className={`${styles.description}`}
                text={content}
              />
            )}

            <Aos
              delay={200}
              className={styles.linkWrapper}
              activeClassName={styles.fadeUpActive}
            >
              <Link href="/about-us" className={styles.linkButton}>
                {button?.label} <ArrowForwardIcon />
              </Link>
            </Aos>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;
