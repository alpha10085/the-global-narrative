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
        <div style={{ flex: 1 }}>
          {points?.map((point, index) => (
            <div key={point?._id} className={styles.pointBlock}>
              <SectionTitle
                delay={index * 0.2}
                title={point?.title}
                className={styles.title}
              />
              <AnimatedParagraph
                text={point?.description}
                delayPerWord={0.1}
                duration={0.75}
                className={styles.description}
              />
            </div>
          ))}
        </div>

        <Aos
          threshold={0.6}
          delay={200} 
          activeClassName={styles.active}
          className={styles.card}
        >
          <Img className={styles.image} url={poster?.url} alt={data?.name} />
        </Aos>
      </div>
    </div>
  );
};

export default AboutUs;
