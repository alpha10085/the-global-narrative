import OurValues from "@/components/Services/OurValues/OurValues";
import { getServicespage } from "./data.test";
import styles from "./styles.module.css";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";
import Quote from "@/components/QuoteSection/QuoteSection";
import SpaceSection from "@/components/SpaceSection/SpaceSection";
import { getPage } from "@/lib/pages";

const Page = async (props) => {
  const {
    hero = {},
    quoteSection = {},
    ourValueSection = {},
  } = await getPage("services-page");


  return (
    <section className={`${styles.container} `}>
      <TemplateHero
        pageTitle="Our services"
        title={hero?.title}
        description={hero?.description}
        poster={hero?.poster}
      />
      <div className={styles.wrapper}>
        <OurValues data={ourValueSection} />
        <Quote data={quoteSection} />
      </div>
      <SpaceSection
        style={{
          background: "#4008a1",
        }}
      />
    </section>
  );
};

export default Page;
