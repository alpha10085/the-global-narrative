import SectionTitle from "../SectionTitle/SectionTitle";
import AnimatedParagraph from "../Shared/Animtions/AnimatedParagraph/AnimatedParagraph";
import Aos from "../Shared/Animtions/Aos/Aos";
import Img from "../Shared/img/Img";
import styles from "./AboutUs.module.css";

const AboutUs = ({ data = {} }) => {
  const { title = "", description = "" } = data;
  return (
    <div id="active-section" data-offset="0" className={styles.container}>
      <div className={`${styles.wrapper} flex gap40`}>
        <div className="">
          <SectionTitle delay={0} title={title} className={styles.title} />

          <AnimatedParagraph
            text={description}
            delayPerWord={0.1} // Slower
            duration={0.75}
            className={styles.description}
          />
        </div>

        <Aos
          threshold={0.6}
          delay={200}
          activeClassName={styles.active}
          className={`${styles.card}`}
        >
          <Img
            className={styles.image}
            url={data?.poster?.url}
            alt={data?.name}
          />
        </Aos>
      </div>
    </div>
  );
};

export default AboutUs;
