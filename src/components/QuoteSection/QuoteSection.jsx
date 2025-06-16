import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./QuoteSection.module.css";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import AnimatedParagraph from "@/components/Shared/Animtions/AnimatedParagraph/AnimatedParagraph";
import Link from "@/components/Shared/Link/Link";
import AnimatedSlideParagraph from "../Shared/Animtions/AnimatedSlideParagraph/AnimatedSlideParagraph";

const QuoteSection = ({ data = {} }) => {
  const { title = "", description = "" } = data;
  return (
    <div className={`${styles.container} gap50 flex column `}>
      <SectionTitle delay={600} title={title} className={styles.title} />

      <AnimatedSlideParagraph
        text={description}
        delay={0.3} // Slower
        duration={0.6}
        className={styles.description}
        animationMode="slideUp"
      />
    </div>
  );
};

export default QuoteSection;
