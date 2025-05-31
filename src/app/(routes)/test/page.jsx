import styles from "./styles.module.css";

import FloatedSection from "@/components/FloatedSection/FloatedSection";

const Page = async (props) => {
  return (
    <section className={`${styles.container} flex-c`}>
    <FloatedSection />
    </section>
  );
};

export default Page;
