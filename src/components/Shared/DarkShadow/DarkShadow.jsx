import styles from "./DarkShadow.module.css";

const DarkShadow = ({ className = "" }) => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.darkshadow} ${className}`} />
    </div>
  );
};

export default DarkShadow;
