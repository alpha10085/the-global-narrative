import { getpage } from "./data.test";
import styles from "./styles.module.css";
import ServicesList from "@/components/Services/ServicesList/ServicesList";
import Hero from "@/components/Services/Hero/Hero";
// import { metadataHandler } from "@/utils/metadata";
// import { getPage } from "@/lib/pages";

// export const generateMetadata = metadataHandler(getPage, `services`);
const Page = async () => {
  const data = await getpage("services");
  return (
    <section className={styles.container}>
      {/* Hero  */}
      <Hero data={data} />

      {/* Service List */}
      <ServicesList data={data} />

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
