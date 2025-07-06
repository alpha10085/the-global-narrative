import ServicesList from "@/components/Services/ServicesList/ServicesList";
import styles from "./styles.module.css";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
import SpaceSection from "@/components/SpaceSection/SpaceSection";
import { getPage } from "@/lib/pages";
import { pageMetadataHandler } from "@/utils/metadata";
import SSRFetcher from "@/components/Shared/SSRFetcher/SSRFetcher";
import Template from "@/components/Template/Template";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";

const pageKey = "services-page";
export const generateMetadata = pageMetadataHandler(getPage, pageKey);
const Page = async (props) => {
  const {
    hero = {},
    quoteSection = {},
    ourValueSection = {},
    title = "explore our solutions",
  } = await getPage(pageKey);
console.log(hero);

  return (
    <Template
      color="blue"
      pageTitle={title}
      className={styles.main}
      data={hero}
    >
      <FloatedSection>
        <SSRFetcher
          Component={ServicesList}
          options={{
            next: {
              revalidate: "1y",
              tags: ourValueSection?.cards || ["ourValue-service"],
            },
          }}
          data={ourValueSection}
          path={`/service/services?ids=${ourValueSection?.cards}`}
        />
      </FloatedSection>

      <QuoteSection
        link={{
          href: "/contact-us",
          label: `${quoteSection?.button?.label}`,
        }}
        data={quoteSection}
      />

      <SpaceSection style={{ background: "white" }} />
    </Template>
  );
};

export default Page;
