import SectionTitle from "../SectionTitle/SectionTitle";
import AnimatedParagraph from "../Shared/Animtions/AnimatedParagraph/AnimatedParagraph";
import styles from "./ContentSection.module.css";

const ContentSection = ({ data = {} }) => {
  const { title = "", description = "" } = data;
  return (
    <div id="active-section" data-offset="0" className={styles.container}>
      <div className={`${styles.wrapper} flex gap40`}>
        <SectionTitle delay={0} title={title} className={styles.title} />

        <AnimatedParagraph
          text={description}
          delayPerWord={0.1} // Slower
          duration={0.75}
          className={styles.description}
        />
      </div>
    </div>
  );
};

export default ContentSection;
