import OurValues from "@/components/Services/OurValues/OurValues";
import styles from "./styles.module.css";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
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
        <QuoteSection data={quoteSection} />
      </div>

      <SpaceSection style={{ background: "var(--color200)" }} />
    </section>
  );
};

export default Page;
