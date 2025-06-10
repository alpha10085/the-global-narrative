import Img from "@/components/Shared/img/Img";
import styles from "./TemplateHero.module.css";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import { ArrowOutwardIcon } from "@/components/Home/icons";
import ButtonScroll from "./Client";
import ScrollToContinueButton from "@/components/ScrollToContinueButton/ScrollToContinueButton";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
const TemplateHero = ({
  pageTitle = "about us",
  title,
  description,
  poster,
}) => {
  return (
    
      <div className={`${styles.container} flex al-i-c gap50 just-sb`}>
        <div className={`${styles.left} flex mt-50  column`}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <SectionTitle title={title} className={styles.title} />
          <Aos
            activeClassName={styles.active}
            className={styles.aosText}
            delay={600}
          >
            <p className={styles.description}>{description}</p>
          </Aos>
          <ScrollToContinueButton />
        </div>
        <Aos
          delay={1000}
          className={styles.posterAos}
          activeClassName={styles.active}
        >
          {<Img disableSkeleton className={styles.poster} url={poster.url} />}
        </Aos>
      </div>
  );
};

export default TemplateHero;
