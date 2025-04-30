import WordPullUp from "@/components/Shared/Animtions/WordPullUp/WordPullUp";
import styles from "./page.module.css";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import { ArrowForwardIosIcon } from "@/components/Home/icons";

const Home = async () => {
  return (
    <div className={styles.layout}>
      <div className={styles.wrapperBg} />
      <div className={`${styles.content} flex-c column`}>
        <WordPullUp
          duration={0.6}
          delay={0}
          text="ALPHAX"
          className={styles.subtitle}
        />
        <Aos delay={700} activeClassName={styles.active} className={styles.aos}>
          <p>start your project with our folder structure</p>
        </Aos>
        <Aos delay={800} activeClassName={styles.active} className={styles.aos}>
          <button className={`flex-c gap5 ${styles.button}`}>
            Get Started
            <ArrowForwardIosIcon />
          </button>
        </Aos>
      </div>
    </div>
  );
};

export default Home;
