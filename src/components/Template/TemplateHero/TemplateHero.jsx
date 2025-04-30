import ShadowBg from "@/components/ShadowBg/ShadowBg";
import styles from "./TemplateHero.module.css";
const TemplateHero = ({ color = "white", data = {} }) => {
  return (
    <div className={`${styles.hero} showSmooth flex-c column`}>
      <ShadowBg className={styles.ShadowBg} color={color} />
      <h1 className={styles.titlepage}>{data.title}</h1>
      <p className={` ${styles.description}`}>{data.description}</p>
    </div>
  );
};

export default TemplateHero;
