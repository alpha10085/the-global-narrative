import styles from "./TemplateHero.module.css";
import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";

const TemplateHero = ({ pageTitle = "..." }) => {
  return (
    <div className={styles.staticWrapper}>
      <div className={`${styles.container} flex  gap50 `}>
        <div className={styles.bg}>
          <AnimatedBackground
            speed={0.3}
            // 1. Classic Cyan
            //  color={[0.0, 1.0, 1.0]} // Pure cyan — vibrant & clean
            // // 2. Bright Neon Blue
            // color={[0.4, 0.8, 1]} // Slightly deeper, electric feel

            // // 3. Aqua Mint
            color={[0.2, 1.0, 1.0]} // Soft, refreshing, minty cool
            // // 4. Ice Blue
            // color={[0.4, 1.0, 1.0]} // Softer tint, arctic vibe

            mouseReact={false}
            amplitude={0}
          />
        </div>
        <h1 className={styles.title}>{pageTitle}</h1>
      </div>
    </div>
  );
};

export default TemplateHero;
