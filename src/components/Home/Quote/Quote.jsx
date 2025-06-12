import Img from "@/components/Shared/img/Img";
import styles from "./Quote.module.css";
import WordFadeIn from "@/components/Shared/Animtions/WordFadeIn/WordFadeIn";

const bgImage =
  "https://res.cloudinary.com/dpuygkgve/image/upload/v1749698570/ChatGPT_Image_Jun_12_2025_06_18_49_AM-Photoroom_1_zt7xdb.png";
const Quote = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <WordFadeIn mode="dark" className={styles.text} text={data?.content} />
      </div>

      <Img url={bgImage} className={styles.bgImage} />
    </div>
  );
};

export default Quote;
