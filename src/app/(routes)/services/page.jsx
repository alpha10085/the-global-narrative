import OurValues from "@/componentss/Services/OurValues/OurValues";
import styles from "./styles.module.css";
import TemplateHero from "@/componentss/Template/TemplateHero/TemplateHero";
import QuoteSection from "@/componentss/QuoteSection/QuoteSection";
import SpaceSection from "@/componentss/SpaceSection/SpaceSection";
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
        <QuoteSection data={quoteSection} />
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
