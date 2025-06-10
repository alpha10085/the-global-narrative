import SectionTitle from "@/componentss/SectionTitle/SectionTitle";
import styles from "./QuoteSection.module.css";
import FloatedSection from "@/componentss/Shared/FloatedSection/FloatedSection";
import AnimatedParagraph from "@/componentss/Shared/Animtions/AnimatedParagraph/AnimatedParagraph";
import Link from "@/componentss/Shared/Link/Link";

const QuoteSection = ({ data = {} }) => {
  const { title = "", description = "" } = data;
  return (
    <Link
      href={"/contact-us"}
      className={`${styles.container} gap50 flex column `}
    >
      <SectionTitle
        delay={600}
        options={{
          ["data-cursor-label"]: "GET IN Touch",
        }}
        title={title}
        className={styles.title}
      />

      <AnimatedParagraph
        options={{
          ["data-cursor-label"]: "GET IN Touch",
        }}
        text={description}
        delayPerWord={0.15} // Slower
        duration={0.8}
        className={styles.description}
      />
    </Link>
  );
};

export default QuoteSection;
