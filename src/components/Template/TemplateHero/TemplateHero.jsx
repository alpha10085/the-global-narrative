import Img from "@/components/Shared/img/Img";
import styles from "./TemplateHero.module.css";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
const TemplateHero = ({ title, description, poster, children }) => {
  return (
    <div className={`${styles.container} flex al-i-c gap20 just-sb`}>
      <div className={`${styles.left} flex mt-50 gap30 column`}>
        <SectionTitle title={title} className={styles.title} />
        <p className={styles.description}>{description}</p>
        {children}
      </div>
      {poster?.url && <Img className={styles.poster} url={poster.url} />}
    </div>
  );
};

export default TemplateHero;
