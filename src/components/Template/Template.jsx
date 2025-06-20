import TemplateHero from "./TemplateHero/TemplateHero";
import styles from "./Template.module.css";
const Template = ({ className = "", pageTitle = "", data = {}, children }) => {
  return (
    <>
      <TemplateHero pageTitle={pageTitle} data={data} />
      <div className={`${className} ${styles.container}`}>
        <div className={`flex  gap40 ${styles.content}`}>
          <h1>{data?.title}</h1>
          <p className={`${styles.iner} `}>{data?.description}</p>
        </div>
        {children}
      </div>
    </>
  );
};

export default Template;
