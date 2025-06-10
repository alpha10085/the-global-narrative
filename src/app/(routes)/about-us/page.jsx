import SpaceSection from "@/componentss/SpaceSection/SpaceSection";
import { getAboutUSPage } from "./data.test";
import styles from "./styles.module.css";
import TemplateHero from "@/componentss/Template/TemplateHero/TemplateHero";
import OurValues from "@/componentss/AboutUs/OurValues/OurValues";
import AboutUs from "@/componentss/AboutUs/AboutUs";
import FloatedSection from "@/componentss/Shared/FloatedSection/FloatedSection";
import QuoteSection from "@/componentss/QuoteSection/QuoteSection";
import WhoUsSection from "@/componentss/AboutUs/WhoUsSection/WhoUsSection";
import { getPage } from "@/lib/pages";

const Page = async (props) => {
  const {
    hero = {},
    whoUsSectionSection = {},
    ourValues = [],
    aboutUs = {},
    quoteSection = {},
  } = await getPage("about-us");
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
      <FloatedSection>
        <OurValues data={ourValues} />
        <WhoUsSection data={whoUsSectionSection} />
      </FloatedSection>
      <QuoteSection data={quoteSection} />
      <SpaceSection style={{ background: "#4008a1" }} />
    </section>
  );
};

export default Page;
