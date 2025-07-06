import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import styles from "./SectionTitle.module.css";

const SectionTitle = ({ options = {}, delay = 200,  title }) => (
  <WordPullUpV2
    duration={0.6}
    delay={delay}
    className={`${styles.title} title-xl `}
    text={title}
    options={options}
  />
);

export default SectionTitle;
