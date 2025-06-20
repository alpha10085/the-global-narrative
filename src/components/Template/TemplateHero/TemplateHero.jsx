import styles from "./TemplateHero.module.css";
import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";

export const colors = {
  classicCyan: [0.1, 1.0, 1.0],
  brightNeonBlue:[0.7, 0.1, 1],
  aquaMint: [0.2, 1.0, 1.0],
  iceBlue: [0.4, 1.0, 1.0],
  default: [0.5, 1, 1],
};

/**
 * @typedef {keyof typeof colors} ColorKey
 */

/**
 * @param {{ color?: keyof typeof colors, pageTitle?: string }} props
 */
const TemplateHero = ({ color = null, pageTitle = "..." }) => {
  const selectedColor = colors?.[color] || colors.default;

  return (
    <div className={styles.staticWrapper}>
      <div className={`${styles.container} flex gap50`}>
        <div className={styles.bg}>
          <AnimatedBackground
            speed={0.3}
            color={selectedColor}
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
