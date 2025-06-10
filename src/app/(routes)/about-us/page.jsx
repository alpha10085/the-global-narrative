import SpaceSection from "@/components/SpaceSection/SpaceSection";
import { getAboutUSPage } from "./data.test";
import styles from "./styles.module.css";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";
import OurValues from "@/components/AboutUs/OurValues/OurValues";
import AboutUs from "@/components/AboutUs/AboutUs";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import QuoteSection from "@/components/QuoteSection/QuoteSection";

const Page = async (props) => {
  const {
    hero = {},
    whoUsSectionSection = {},
    ourValues = [],
    aboutUs = {},
    quoteSection = {},
  } = getAboutUSPage();
  return (
    <section className={`${styles.container} `}>
      <FloatedSection>
        <FloatedSection>
          <TemplateHero
            title={hero?.title}
            description={hero?.description}
            poster={hero?.poster}
          />
        </FloatedSection>
        <AboutUs data={aboutUs} />
      </FloatedSection>
      <OurValues data={ourValues} />
       <QuoteSection data={quoteSection} />
       
      <SpaceSection style={{ background: "#4008a1" }} />
    </section>
  );
};

export default Page;
