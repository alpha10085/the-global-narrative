import styles from "./MissionVisionValues.module.css";
import TextRotator from "@/components/Shared/Animtions/TextRotator/TextRotator";

const MissionVisionValues = ({ data = {} }) => {
  const titles = data?.map((item) => item.title);

  return (
    <section className={`${styles.section} flex-c`}>
      <div className={styles.container}>
        <TextRotator texts={titles} interval={2500} className={styles.text} />
      </div>
    </section>
  );
};

export default MissionVisionValues;
