import SpaceSection from "@/components/SpaceSection/SpaceSection";
import styles from "./styles.module.css";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";
import OurValues from "@/components/AboutUs/OurValues/OurValues";
import AboutUs from "@/components/AboutUs/AboutUs";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
import { getPage } from "@/lib/pages";

const Page = async (props) => {
  const {
    hero = {},
    whoUsSectionSection = {},
    ourValues = [],
    // aboutUs = {},
    quoteSection = {},
  } = await getPage("join-us");
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
        {/* <ContentSection data={aboutUs} /> */}
      </FloatedSection>
      <FloatedSection>
        {/* <WhoUsSection data={whoUsSectionSection} /> */}
      </FloatedSection>
      <QuoteSection data={quoteSection} />
      <SpaceSection style={{ background: "var(--color200)" }} />
    </section>
  );
};

export default Page;
