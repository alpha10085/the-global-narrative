import { getpage } from "./data.test";
import styles from "./styles.module.css";
import ServicesList from "@/Components/Services/ServicesList/ServicesList";
import MarqueeLogos from "@/Components/Services/Marquee/Marquee";
import Link from "next/link";
import TemplateHero from "@/Components/Template/TemplateHero/TemplateHero";
import SectionTitle from "@/Components/SectionTitle/SectionTitle";
import MainLink from "@/Components/MainLink/MainLink";
import { customers } from "../clients/data.test";
import FAQItem from "@/Components/Services/FAQItem/FAQItem";
// import { metadataHandler } from "@/utils/metadata";
// import { getPage } from "@/lib/pages";

// export const generateMetadata = metadataHandler(getPage, `services-page`);
const Page = async () => {
  const {
    title = "",
    description = "",
    poster = {},
    services = [],
    faqs = [],
  } = await getpage("services-page");
  return (
    <section className={styles.container}>
      {/* Hero  */}
      <TemplateHero title={title} description={description} poster={poster} />

      {/* Service List */}
      <ServicesList data={services} />





      {/* FAQ List */}
        <div className={styles.faqSection}>
          <SectionTitle
            title="Frequently Asked Questions"
            className={styles.faqTitle}
          />
          <div className={styles.faqList}>
            {faqs?.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq?.question}
                answer={faq?.answer}
              />
            ))}
          </div>
        </div>
    
    </section>
  );
};

export default Page;
