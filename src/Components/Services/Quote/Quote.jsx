import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./Quote.module.css";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import AnimatedParagraph from "@/components/Shared/Animtions/AnimatedParagraph/AnimatedParagraph";
import Link from "@/components/Shared/Link/Link";

const Quote = ({ data = {} }) => {
  const { title = "", description = "" } = data;
  return (
    <Link 
    href={"/contact-us"}
    className={`${styles.container} gap50 flex column `}>
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

export default Quote;
