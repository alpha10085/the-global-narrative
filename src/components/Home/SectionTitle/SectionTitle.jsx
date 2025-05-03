import styles from "./SectionTitle.module.css";

const SectionTitle = ({
  className = "",
  title
}
) => <h1 className={`${styles.title} ${className}`}>{title}</h1>;

export default SectionTitle;
