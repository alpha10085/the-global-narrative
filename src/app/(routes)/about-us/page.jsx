import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { getAboutUSPage } from "./data.test";
import styles from "./styles.module.css";
import Hero from "@/components/AboutUs/Hero/Hero";
import OurValues from "@/components/AboutUs/OurValues/OurValues";
import WhoUsSection from "@/components/AboutUs/WhoUsSection/WhoUsSection";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";

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
