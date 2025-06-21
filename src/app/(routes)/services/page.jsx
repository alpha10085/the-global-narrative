import OurValues from "@/components/Services/OurValues/OurValues";
import styles from "./styles.module.css";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
import SpaceSection from "@/components/SpaceSection/SpaceSection";
import { getPage } from "@/lib/pages";
import { pageMetadataHandler } from "@/utils/metadata";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import SSRFetcher from "@/components/Shared/SSRFetcher/SSRFetcher";
import Template from "@/components/Template/Template";

const pageKey = "services-page";
export const generateMetadata = pageMetadataHandler(getPage, pageKey);
const Page = async (props) => {
  const {
    hero = {},
    quoteSection = {},
    ourValueSection = {},
  } = await getPage(pageKey);

  return (
    <Template
      color="brightNeonBlue"
      pageTitle="services"
      className={styles.main}
      data={hero}
    >
      <SSRFetcher
          Component={OurValues}
          options={{
            next: { revalidate: "1y", tags: ourValueSection?.cards || ["ourValue-service"] },
          }}
          data={ourValueSection}
          path={`/service/services?ids=${ourValueSection?.cards}`}
          />
      <QuoteSection
          link={{
            href: "/contact-us",
            label: "get in touch",
          }}
          data={quoteSection}
          />

      <SpaceSection style={{ background: "white" }} />
    </Template>
  );
};

export default Page;
