import SectionTitle from "../SectionTitle/SectionTitle";
import AnimatedParagraph from "../Shared/Animtions/AnimatedParagraph/AnimatedParagraph";
import FloatedSection from "../Shared/FloatedSection/FloatedSection";
import styles from "./AboutUs.module.css";

const AboutUs = ({ data = {} }) => {
  const { title = "", description = "" } = data;
  return (

    <div
    
    className={styles.container}>
        <div className={`${styles.wrapper} flex gap40`}>
          <SectionTitle
            options={{
              ["data-cursor-label"]: "Explore services",
            }}
            delay={0}
            title={title}
            className={styles.title}
          />

          <AnimatedParagraph
            options={{
              ["data-cursor-label"]: "Explore services",
            }}
            text={description}
            delayPerWord={0.1} // Slower
            duration={0.75}
            className={styles.description}
          />
        </div>
    </div>

  );
};

export default AboutUs;
