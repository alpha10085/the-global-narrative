import SpaceSection from "@/components/SpaceSection/SpaceSection";
import { getAboutUSPage } from "./data.test";
import styles from "./styles.module.css";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";

const Page = async (props) => {
  const { hero = {}, whoUsSectionSection = {} } = getAboutUSPage();
  return (
    <section className={`${styles.container} `}>
      <TemplateHero
        title={hero?.title}
        description={hero?.description}
        poster={hero?.poster}
      />
      <SpaceSection
        style={{
          background: "#06003d",
        }}
      />
    </section>
  );
};

export default Page;
