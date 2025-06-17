import SpaceSection from "@/components/SpaceSection/SpaceSection";
import styles from "./styles.module.css";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
import { getPage } from "@/lib/pages";
import WhoUsSection from "@/components/AboutUs/WhoUsSection/WhoUsSection";
import { pageMetadataHandler } from "@/utils/metadata";

const pageKey = "join-us";
export const generateMetadata = pageMetadataHandler(getPage, pageKey);
const Page = async (props) => {
  const {
    hero = {},
    whoUsSectionSection = {},
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
      <QuoteSection
        link={{
          href: "/contact-us",
          label: "get in touch",
        }}
        data={quoteSection}
      />
      <SpaceSection style={{ background: "var(--color200)" }} />
    </section>
  );
};

export default Page;
