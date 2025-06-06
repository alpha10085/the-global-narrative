import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import { getAboutUSPage } from "./data.test";
import styles from "./styles.module.css";
import Hero from "@/Components/AboutUs/Hero/Hero";
import OurValues from "@/Components/AboutUs/OurValues/OurValues";
import WhoUsSection from "@/Components/AboutUs/WhoUsSection/WhoUsSection";
import TemplateHero from "@/Components/Template/TemplateHero/TemplateHero";

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
