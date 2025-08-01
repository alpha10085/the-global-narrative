import styles from "./styles.module.css";
import OurValues from "@/components/AboutUs/OurValues/OurValues";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
import { getPage } from "@/lib/pages";
import { pageMetadataHandler } from "@/utils/metadata";
import Template from "@/components/Template/Template";
import WhoUsSection from "@/components/AboutUs/WhoUsSection/WhoUsSection";
import SpaceSection from "@/components/SpaceSection/SpaceSection";
import AboutUs from "@/components/AboutUs/AboutUs";

const pageKey = "about-us";
export const generateMetadata = pageMetadataHandler(getPage, pageKey);
const Page = async (props) => {
  const {
    hero = {},
    ourValues = [],
    whoUsSectionSection = {},
    missionVision = {},
    quoteSection = {},
  } = await getPage("about-us");
  return (
    <Template
      color="classicCyan"
      pageTitle="who we are"
      className={styles.main}
      data={hero}
    >
      <FloatedSection>
        <WhoUsSection data={whoUsSectionSection} />
      </FloatedSection>

      <OurValues data={ourValues} />

      <FloatedSection>
        <AboutUs data={missionVision} />
      </FloatedSection>

      <QuoteSection
        link={{
          href: "/services",
          label: `${quoteSection?.button?.label}`,
        }}
        data={quoteSection}
      />
      <SpaceSection style={{ background: "white" }} />
    </Template>
  );
};

export default Page;
