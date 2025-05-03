import { getpage } from "./data.test";
import styles from "./styles.module.css";
import ServicesList from "@/components/Services/ServicesList/ServicesList";
import MarqueeLogos from "@/components/Services/Marquee/Marquee";
import Link from "next/link";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";
// import { metadataHandler } from "@/utils/metadata";
// import { getPage } from "@/lib/pages";

// export const generateMetadata = metadataHandler(getPage, `services`);
const Page = async () => {
  const data = await getpage("services");
  return (
    <section className={styles.container}>
      {/* Hero  */}
      <TemplateHero title={data?.title} description={data?.description} poster={data?.poster} />

      {/* Service List */}
      <ServicesList data={data} />

      {/* MarqueeLogos */}
      <div className={styles.logosSection}>
        <div className=" flex just-sb al-i-c wrap w-90 m-auto">
          <h1 className={styles.logosTitle}>Our Partners</h1>
          <Link className={styles.logoLink} href="/clients">
            See all <span className={styles.arrow}>→</span>
          </Link>
        </div>
        <MarqueeLogos data={data?.partners} />
      </div>

      {/* FAQ List */}
      <div className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {data?.faqs?.map((faq, index) => (
            <details key={index} className={styles.faqItem}>
              <summary>{faq?.question}</summary>
              <p>{faq?.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
