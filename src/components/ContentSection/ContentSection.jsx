import SectionTitle from "../SectionTitle/SectionTitle";
import AnimatedSlideParagraph from "../Shared/Animtions/AnimatedSlideParagraph/AnimatedSlideParagraph";
import styles from "./ContentSection.module.css";

const ContentSection = ({ data = {} }) => {
  const { title = "", description = "" } = data;
  return (
    <div id="active-section" data-offset="0" className={styles.container}>
      <div className={`${styles.wrapper} flex gap40`}>
        <SectionTitle delay={0} title={title} className={styles.title} />

        <AnimatedSlideParagraph
          text={description}
          delay={0.3} // Slower
          duration={0.75}
          threshold={0.5}
          className={styles.description}
        />
      </div>
    </div>
  );
};

export default ContentSection;
