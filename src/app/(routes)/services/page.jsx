import Services from "@/components/Services/Services/Services";
import { getpage } from "./data.test";
import styles from "./styles.module.css";
import Img from "@/components/Shared/img/Img";
import ServicesList from "@/components/Services/ServicesList/ServicesList";
// import { metadataHandler } from "@/utils/metadata";
// import { getPage } from "@/lib/pages";

// export const generateMetadata = metadataHandler(getPage, `services`);
const Page = async () => {
  const data = await getpage("services");
  return (
    <section className={styles.container}>
      {/* <Services/> */}


     {/* Hero  */}
      <div className={styles.hero}>
        <h1 className={styles.title}>{data?.title}</h1>
        <p className={styles.subtitle}>{data?.description}</p>

        <Img
          alt="Services"
          className={styles.poster}
          url={
            "https://res.cloudinary.com/dsed1slaz/image/upload/v1746235167/pexels-padrinan-2882669_vvtl5x.jpg"
          }
        />
      </div>

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
