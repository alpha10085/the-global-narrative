import Link from "@/components/Shared/Link/Link";
import styles from "./Quote.module.css";
import Threads from "@/components/Threads/Threads";
import { ArrowBackIosNewIcon,ArrowOutwardIcon ,ArrowForwardIosIcon } from "../icons";

const Quote = ({ data = {} }) => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {/* Left animated mesh */}
        <div className={styles.left}>
          <Threads className={styles.verticalMesh} color={"#385cf5"} amplitude={2} />
        </div>

        {/* Right content */}
        <div className={styles.right}>
          <h2 className={styles.title}>We manage your reputation, you focus on making an impact.</h2>
          <p className={styles.description}>
            Experience the next generation of interactive design and animation.
          </p>
          <Link href="/learn-more" className={styles.link}>
            Learn about us <ArrowForwardIosIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Quote;
