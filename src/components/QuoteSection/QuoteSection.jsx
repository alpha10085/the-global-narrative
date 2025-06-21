import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./QuoteSection.module.css";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import AnimatedParagraph from "@/components/Shared/Animtions/AnimatedParagraph/AnimatedParagraph";
import Link from "@/components/Shared/Link/Link";
import AnimatedSlideParagraph from "../Shared/Animtions/AnimatedSlideParagraph/AnimatedSlideParagraph";
import Button from "./Button";
import Aos from "../Shared/Animtions/Aos/Aos";

const QuoteSection = ({ link = { href: "/", label: "" }, data = {} }) => {
  const { title = "", description = "" } = data;
  return (
    <div className={`${styles.container} `}>
      <div className={`${styles.contentWrapper}   flex column`}>
        <SectionTitle delay={600} title={title} className={styles.title} />
        <div className={`flex gap25 column ${styles.bottomBox}`}>
          <AnimatedSlideParagraph
            text={description}
            delay={0.3} // Slower
            duration={0.6}
            className={styles.description}
            animationMode="slideUp"
          />
          <Aos
            activeClassName={styles.active}
            className={styles.aosLink}
            delay={1000}
          >
            <Button className={styles.link} {...link} />
          </Aos>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;
