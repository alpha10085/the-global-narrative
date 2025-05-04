import Img from "@/components/Shared/img/Img";
import styles from "./TemplateHero.module.css";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
const TemplateHero = ({ title, description, poster }) => {
  return (
    <div className={`${styles.container} flex al-i-c gap20 just-sb`}>
      <div className={`${styles.left} flex mt-50 gap30 column`}>
        <SectionTitle title={title} className={styles.title} />
        <Aos
          activeClassName={styles.active}
          className={styles.aosText}
          delay={600}
        >
          <p className={styles.description}>{description}</p>
        </Aos>
      </div>
      <Aos
        delay={1000}
        className={styles.posterAos}
        activeClassName={styles.active}
      >
        {<Img className={styles.poster} url={poster.url} />}
      </Aos>
    </div>
  );
};

export default TemplateHero;
