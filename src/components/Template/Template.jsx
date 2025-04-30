import Link from "@/components/Shared/LocalizedLink/Link";
import Aos from "../Shared/Animtions/Aos/Aos";
import WordPullUp from "../Shared/Animtions/WordPullUp/WordPullUp";
import { ArrowIcon, ButtonSeeMore } from "./client";
import styles from "./Template.module.css";
import { lineBreak, searchAndReplace } from "@/utils/text";
import TemplateHero from "./TemplateHero/TemplateHero";
import TemplateList from "./TemplateList/TemplateList";

const Template = ({ title, description, data, children, mode = "bottom" }) => {
  const sectionTitle = `${searchAndReplace(title, " ", "-")}-main`;

  return (
    <div className={styles.mainContent}>
      <TemplateHero
        sectionTitle={sectionTitle}
        title={title}
        description={description}
      />
      {mode === "top" && children}
      <TemplateList data={data} sectionTitle={sectionTitle} />
      {mode === "bottom" && children}
    </div>
  );
};

export default Template;
