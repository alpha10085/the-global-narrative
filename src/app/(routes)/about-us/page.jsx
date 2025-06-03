import SectionTitle from "@/_components/SectionTitle/SectionTitle";
import { getAboutUSPage } from "./data.test";
import styles from "./styles.module.css";
import Hero from "@/_components/AboutUs/Hero/Hero";
import OurValues from "@/_components/AboutUs/OurValues/OurValues";
import WhoUsSection from "@/_components/AboutUs/WhoUsSection/WhoUsSection";
import TemplateHero from "@/_components/Template/TemplateHero/TemplateHero";

const Page = async (props) => {
  const { hero = {}, ourValueSection = {} ,whoUsSectionSection={}} = getAboutUSPage();
  return (
    <section className={`${styles.container} `}>
      <TemplateHero title={hero?.title} description={hero?.description} poster={hero?.poster} />
      <OurValues data={ourValueSection} />
      <WhoUsSection data={whoUsSectionSection} />
    </section>
  );
};

export default Page;
