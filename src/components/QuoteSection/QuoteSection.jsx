import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./QuoteSection.module.css";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import AnimatedParagraph from "@/components/Shared/Animtions/AnimatedParagraph/AnimatedParagraph";
import Link from "@/components/Shared/Link/Link";

const QuoteSection = ({ data = {} }) => {
  const { title = "", description = "" } = data;
  return (
    <div className={`${styles.container} gap50 flex column `}>
      <SectionTitle delay={600} title={title} className={styles.title} />

      <AnimatedParagraph
        text={description}
        delayPerWord={0.15} // Slower
        duration={0.8}
        className={styles.description}
      />
    </div>
  );
};

export default QuoteSection;
