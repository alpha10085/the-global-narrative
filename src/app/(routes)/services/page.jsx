import { getpage } from "./data.test";
import styles from "./styles.module.css";
import ServicesList from "@/_components/Services/ServicesList/ServicesList";
import MarqueeLogos from "@/_components/Services/Marquee/Marquee";
import Link from "next/link";
import TemplateHero from "@/_components/Template/TemplateHero/TemplateHero";
import SectionTitle from "@/_components/SectionTitle/SectionTitle";
import MainLink from "@/_components/MainLink/MainLink";
import { customers } from "../clients/data.test";
import FAQItem from "@/_components/Services/FAQItem/FAQItem";
// import { metadataHandler } from "@/utils/metadata";
// import { getPage } from "@/lib/pages";

// export const generateMetadata = metadataHandler(getPage, `services`);
const Page = async () => {
  const {
    title = "",
    description = "",
    poster = {},
    services = [],
    faqs = [],
  } = await getpage("services");
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
