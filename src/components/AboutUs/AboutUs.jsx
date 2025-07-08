import SectionTitle from "../SectionTitle/SectionTitle";
import AnimatedParagraph from "../Shared/Animtions/AnimatedParagraph/AnimatedParagraph";
import Aos from "../Shared/Animtions/Aos/Aos";
import Img from "../Shared/img/Img";
import styles from "./AboutUs.module.css";

const AboutUs = ({ data = {} }) => {
  const { points = [], poster } = data;

  return (
    <div id="active-section" data-offset="0" className={styles.container}>
      <div className={`${styles.wrapper} flex gap40`}>
        {points?.map((point, index) => (
          <Aos
            key={point?._id}
            className={`flex-c column ${styles.pointBlock}`}
            activeClassName={styles.active}
            delay={index * 100}
          >
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>{point.title}</h1>
              {/* <h1 className={styles.titleMain}>{point.title}</h1> */}
            </div>
            <div className={`${styles.qoutescontetn}`}>
              <Img className={styles.icon} url="/qoute-icon.png" />
              <AnimatedParagraph
                classNameLine={styles.classNameLine}
                text={point.description}
                delayPerWord={0.1}
                duration={0.75}
                className={styles.description}
              />
            </div>
          </Aos>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
