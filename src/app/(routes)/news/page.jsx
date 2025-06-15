export const dynamic = "auto";
import List from "@/components/News/List/List";

import styles from "./styles.module.css";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import ListInterviews from "@/components/MediaCenter/List/List";
import { getPage } from "@/lib/pages";
import { pageMetadataHandler } from "@/utils/metadata";
const pageKey = "custom-news";
export const generateMetadata = pageMetadataHandler(getPage, pageKey);
const page = async () => {
  const data = await getPage(pageKey);
  return (
    <section className={`${styles.layout} showSmooth`} id="news-Categories">
      <div className={styles.header}>
        <p className={`${styles.subTitle} `}>{data?.subTitle}</p>

        <SectionTitle className={styles.title} title={data?.title} />
      </div>
      <List page={data} categories={data?.categories} />
      <div className={styles.headerInterviews}>
        <SectionTitle className={styles.title} title={"Interviews"} />
      </div>
      <ListInterviews />
    </section>
  );
};

export default page;
