import styles from "./SectionLabel.module.css";

const SectionLabel = ({ label = "Options" }) => {
  return <div className={styles.options}>{label}</div>;
};

export default SectionLabel;
