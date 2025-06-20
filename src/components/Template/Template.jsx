import TemplateHero, { colors } from "./TemplateHero/TemplateHero";
import styles from "./Template.module.css";
/**
 * @typedef {keyof typeof colors} ColorKey
 */

/**
 * @param {{ color?: keyof typeof colors, pageTitle?: string }} props
 */
const Template = ({
  className = "",
  pageTitle = undefined,
  data = null,
  children,
  color = null,
}) => {
  return (
    <>
      <TemplateHero color={color} pageTitle={pageTitle} data={data} />
      <div
        id="active-section"
        data-offset="10"
        className={`${className} ${styles.container}`}
      >
        {data && (
          <div className={`flex  gap40 ${styles.content}`}>
            <h1>{data?.title}</h1>
            <p className={`${styles.iner} `}>{data?.description}</p>
          </div>
        )}
        {children}
      </div>
    </>
  );
};

export default Template;
