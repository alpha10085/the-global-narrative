import SpaceSection from "@/components/SpaceSection/SpaceSection";
import styles from "./styles.module.css";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";
import OurValues from "@/components/AboutUs/OurValues/OurValues";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
import { getPage } from "@/lib/pages";
import ContentSection from "@/components/ContentSection/ContentSection";
import { pageMetadataHandler } from "@/utils/metadata";
import WhoUsSection from "@/components/AboutUs/WhoUsSection/WhoUsSection";
import Cube from "@/components/Home/Cube/Cube";

const pageKey = "about-us";
export const generateMetadata = pageMetadataHandler(getPage, pageKey);
const Page = async (props) => {
  const {
    hero = {},
    ourValues = [],
    whoUsSectionSection = {},
    aboutUs = {},
    quoteSection = {},
  } = await getPage("about-us");
  return (
    <section className={`${styles.container} `}>
      <TemplateHero pageTitle={"about us"} />
      <div className={styles.wrapper}>
        <div className={`flex  gap40 ${styles.content}`}>
          <h1>{hero?.title}</h1>
          <p className={`${styles.iner} `}>{hero?.description}</p>
        </div>

        {/* <ContentSection data={aboutUs} /> */}
        <FloatedSection>
          <Cube data={whoUsSectionSection} />
        </FloatedSection>

        <OurValues data={ourValues} />

        {/* <QuoteSection
        link={{
          href: "/services",
          label: "explore our services",
        }}
        data={quoteSection}
      /> */}
        {/* <SpaceSection style={{ background: "var(--color200)" }} /> */}
      </div>
    </section>
  );
};

export default Page;
