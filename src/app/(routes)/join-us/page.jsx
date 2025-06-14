import SpaceSection from "@/components/SpaceSection/SpaceSection";
import styles from "./styles.module.css";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";

import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
import { getPage } from "@/lib/pages";
import ContentSection from "@/components/ContentSection/ContentSection";
import WhoUsSection from "@/components/AboutUs/WhoUsSection/WhoUsSection";

const Page = async (props) => {
  const {
    hero = {},
    whoUsSectionSection = {},
    contentsection = {},
    quoteSection = {},
  } = await getPage("join-us");
  return (
    <section className={`${styles.container} `}>
      <FloatedSection>
        <TemplateHero
          title={hero?.title}
          description={hero?.description}
          poster={hero?.poster}
        />
      </FloatedSection>
      <FloatedSection>
        <WhoUsSection data={whoUsSectionSection} />
      </FloatedSection>
      <QuoteSection data={quoteSection} />
      <SpaceSection style={{ background: "var(--color200)" }} />
    </section>
  );
};

export default Page;
