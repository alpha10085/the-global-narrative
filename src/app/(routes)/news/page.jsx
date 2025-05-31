export const dynamic = "auto";
import List from "@/components/News/List/List";
import { getPage } from "@/lib/pages";
import { getpage } from "./data.test";
import styles from "./styles.module.css";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
// export const generateMetadata = async () =>
//   await pageMetadataHandler(getpage, "");

const page = async () => {
  const data = await getpage("");
  return (
    <section className={`${styles.layout} showSmooth`} id="news-Categories">
      <div className={styles.header}>
        <p className={`${styles.subTitle} `}>{data?.subTitle}</p>
        {/* <h1 className={styles.title}>{data?.title}</h1> */}
        <SectionTitle className={styles.title} title={data?.title} />
      </div>
      <List page={data} categories={data?.categories} />
    </section>
  );
};

export default page;
