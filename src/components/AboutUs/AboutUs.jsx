import SectionTitle from "../SectionTitle/SectionTitle";
import AnimatedParagraph from "../Shared/Animtions/AnimatedParagraph/AnimatedParagraph";
import Aos from "../Shared/Animtions/Aos/Aos";
import Img from "../Shared/img/Img";
import styles from "./AboutUs.module.css";

const AboutUs = ({ data = {} }) => {
  const { title, description, poster } = data;

  return (
    <div  className={styles.container}>
      <div className={`${styles.wrapper} flex column gap20`}>
        <div className={styles.pointBlock}>
          <SectionTitle title={title} className={styles.title} />
          <AnimatedParagraph
            text={description}
            delayPerWord={0.1}
            duration={0.75}
            className={styles.description}
          />
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
