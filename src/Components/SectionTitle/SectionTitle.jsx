import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import styles from "./SectionTitle.module.css";

const SectionTitle = ({
  options ={},
  delay = 200,
  className = "", title }) => (
  <WordPullUpV2
    duration={1}
    delay={delay}
    className={`${styles.title} ${className}`}
    text={title}
    options ={options}
  />
);

export default SectionTitle;
