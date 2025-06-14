import SpaceSection from "@/components/SpaceSection/SpaceSection";
import styles from "./styles.module.css";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";
import OurValues from "@/components/AboutUs/OurValues/OurValues";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
import { getPage } from "@/lib/pages";
import ContentSection from "@/components/ContentSection/ContentSection";

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
        <ContentSection data={aboutUs} />
      </FloatedSection>
      <FloatedSection>
        <OurValues data={ourValues} />
      </FloatedSection>
      <QuoteSection data={quoteSection} />
      <SpaceSection style={{ background: "var(--color200)" }} />
    </section>
  );
};

export default Page;
