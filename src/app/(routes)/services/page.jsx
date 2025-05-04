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
  const {
    title = "",
    description = "",
    poster = {},
    services = [],
    contactSection = {},
    faqs = [],
    partners = [],
  } = await getpage("services");
  return (
    <section className={styles.container}>
      {/* Hero  */}
      <TemplateHero title={title} description={description} poster={poster} />

      {/* Service List */}
      <ServicesList data={services} />

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
        <MarqueeLogos data={partners} />
      </div>

      {/* getInTouch Subscription */}
      <div className={styles.getInTouchSection}>
        <div className={styles.getInTouchContent}>
          <div className=" mb-20">
            <h2 className={styles.getInTouchTitle}>{contactSection?.title}</h2>
            <p className={styles.getInTouchText}>
              {contactSection?.description}
            </p>
          </div>

          <MainLink
            text="Contact us"
            href={"/contact-us"}
            className={styles.getLink}
          />
        </div>
      </div>

      {/* FAQ List */}
      <div className={styles.faqSection}>
        <SectionTitle
          title="Frequently Asked Questions"
          className={styles.faqTitle}
        />
        <div className={styles.faqList}>
          {faqs?.map((faq, index) => (
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
