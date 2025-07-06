import TemplateHero, { colors } from "./TemplateHero/TemplateHero";
import styles from "./Template.module.css";
import { ArrowForwardIosIcon } from "../Home/icons";
import { ButtonArrow } from "./client";
import { lineBreak } from "@/utils/text";
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
    <div className={styles.main}>
      <div className={styles.herowrapper}>
        <TemplateHero color={color} pageTitle={pageTitle} data={data} />
        <ButtonArrow className={`${styles.icon} flex-c`} />
      </div>
      <div
        id="active-section"
        data-offset="10"
        className={`${className} ${styles.container}`}
      >
        {data?.title && data?.description ? (
          <div className={`flex   gap40 just-sb ${styles.content}`}>
            <h1
            
            className="title-l"
            >{data?.title}</h1>
            <div className={`${styles.description} flex  column gap20`}>
              {lineBreak(data?.description, ["."]).map((val, i) => (
                <p 
                style={{
                  animationDelay:`${(i*0.4) + 1}s`
                }}
                key={i} className={`${styles.iner} description-sm `}>
                  {val}
                </p>
              ) )}
            </div>
          </div>
        ): null}
        {children}
      </div>
    </div>
  );
};

export default Template;
