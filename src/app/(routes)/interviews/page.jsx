export const dynamic = "auto";
import List from "@/components/interviews/List/List";
import styles from "./styles.module.css";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { getPage } from "@/lib/pages";
import { pageMetadataHandler } from "@/utils/metadata";
const pageKey = "interviews-page";
export const generateMetadata = pageMetadataHandler(getPage, pageKey);
const page = async () => {
  const data = await getPage(pageKey);
  return (
    <section className={`${styles.layout} showSmooth`}>
      <div className={styles.header}>
        <p className={`${styles.subTitle} `}>{data?.subTitle}</p>
        <SectionTitle className={styles.title} title={data?.title} />
      </div>
      <List page={data} categories={data?.categories} />
    </section>
  );
};

export default page;
