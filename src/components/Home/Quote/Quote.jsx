import Img from "@/components/Shared/img/Img";
import styles from "./Quote.module.css";
import AnimatedSlideParagraph from "@/components/Shared/Animtions/AnimatedSlideParagraph/AnimatedSlideParagraph";

const bgImage =
  "https://res.cloudinary.com/dpuygkgve/image/upload/v1749763391/ChatGPT_Image_Jun_12_2025_06_18_49_AM-Photoroom_1_-Picsart-AiImageEnhancer-Picsart-AiImageEnhancer_mc8n4m.png";
const Quote = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>

              <AnimatedSlideParagraph
        text={data?.content}
        delay={0.3} // Slower
        duration={0.8}
        className={styles.text}
        threshold={0.4}
      />
      </div>

      <Img disableSkeleton url={bgImage} className={styles.bgImage} />
    </div>
  );
};

export default Quote;
