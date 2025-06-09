import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import styles from "./SectionTitle.module.css";

const SectionTitle = ({ className = "", title }) => (
  <WordPullUpV2
    duration={0.6}
    delay={200}
    className={`${styles.title} ${className}`}
    text={title}
  />
);

export default SectionTitle;
