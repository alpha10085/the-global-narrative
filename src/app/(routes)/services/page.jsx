import Services from "@/components/Services/Services/Services";
import { getpage } from "./data.test";
import styles from "./styles.module.css";
// import { metadataHandler } from "@/utils/metadata";
// import { getPage } from "@/lib/pages";

// export const generateMetadata = metadataHandler(getPage, `services`);
const Page = async () => {
  const data = await getpage("services");
  return (
    <section className={styles.container}>

    {/* <Services/> */}

      <div className={styles.hero}>
        <h1 className={styles.title}>{data?.title}</h1>
        <p className={styles.subtitle}>
          {data?.description}
        </p>
      </div>

      <div className={styles.servicesGrid}>
        {data?.services?.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <h3>{service?.title}</h3>
            <p className={styles.serviceIntro}>{service?.intro}</p>
            <p>{service?.description}</p>
          </div>
        ))}
      </div>

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
