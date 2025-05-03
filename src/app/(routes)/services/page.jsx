import { getpage } from "./data.test";
import styles from "./styles.module.css";
import ServicesList from "@/components/Services/ServicesList/ServicesList";
import MarqueeLogos from "@/components/Services/Marquee/Marquee";
import Link from "next/link";
import TemplateHero from "@/components/Template/TemplateHero/TemplateHero";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import MainLink from "@/components/MainLink/MainLink";
// import { metadataHandler } from "@/utils/metadata";
// import { getPage } from "@/lib/pages";

// export const generateMetadata = metadataHandler(getPage, `services`);
const Page = async () => {
  const data = await getpage("services");
  return (
    <section className={styles.container}>
      {/* Hero  */}
      <TemplateHero
        title={data?.title}
        description={data?.description}
        poster={data?.poster}
      />

      {/* Service List */}
      <ServicesList data={data} />

      {/* MarqueeLogos */}
      <div className={styles.logosSection}>
        <div
          className={`${styles.logoWrapper} flex just-sb al-i-c w-90 m-auto`}
        >
          <SectionTitle title="Our Partners" className={styles.logosTitle} />

          <Link className={styles.logoLink} href="/clients">
            See all <span className={styles.arrow}>→</span>
          </Link>
        </div>
        <MarqueeLogos data={data?.partners} />
      </div>

      {/* getInTouch Subscription */}
      <div className={styles.getInTouchSection}>
        <div className={styles.getInTouchContent}>
          <div>
            <h2 className={styles.getInTouchTitle}>Get In Touch</h2>
            <p className={styles.getInTouchText}>
              We’d love to hear from you every great story starts with a simple
              hello. Reach out and let’s create something meaningful together at
              the global Narrative .
            </p>
          </div>

          <MainLink text="Contact us" href={"/contact-us"} className={styles.getLink} />
        </div>
      </div>

      {/* FAQ List */}
      <div className={styles.faqSection}>
        <SectionTitle
          title="Frequently Asked Questions"
          className={styles.faqTitle}
        />
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
