import styles from "./styles.module.css";
import OurValues from "@/components/AboutUs/OurValues/OurValues";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
import { getPage } from "@/lib/pages";
import { pageMetadataHandler } from "@/utils/metadata";
import Cube from "@/components/Home/Cube/Cube";
import Template from "@/components/Template/Template";

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
    <Template
      color="classicCyan"
      pageTitle="about us"
      className={styles.main}
      data={hero}
    >
      <FloatedSection>
        <Cube data={whoUsSectionSection} />
      </FloatedSection>

      {/* <OurValues data={ourValues} /> */}

      {/* <QuoteSection
        link={{
          href: "/services",
          label: "explore our services",
        }}
        data={quoteSection}
      /> */}
      {/* <SpaceSection style={{ background: "var(--color200)" }} /> */}
    </Template>
  );
};

export default Page;
