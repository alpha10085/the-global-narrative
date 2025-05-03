import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { getAboutUSPage } from "./data.test";
import styles from "./styles.module.css";
import Hero from "@/components/AboutUs/Hero/Hero";
import OurValues from "@/components/AboutUs/OurValues/OurValues";
import WhoUsSection from "@/components/AboutUs/WhoUsSection/WhoUsSection";

const Page = async (props) => {
  const { hero = {}, ourValueSection = {} ,whoUsSectionSection={}} = getAboutUSPage();
  return (
    <section className={`${styles.container} `}>
      <Hero data={hero} />
      <OurValues data={ourValueSection} />
      <WhoUsSection data={whoUsSectionSection} />
    </section>
  );
};

export default Page;
