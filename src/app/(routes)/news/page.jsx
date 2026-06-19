export const dynamic = "auto";
import List from "@/components/News/List/List";

import styles from "./styles.module.css";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import ListInterviews from "@/components/MediaCenter/List/List";
import { getPage } from "@/lib/pages";
import { pageMetadataHandler } from "@/utils/metadata";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
const pageKey = "custom-news";
export const generateMetadata = pageMetadataHandler(getPage, pageKey);
const page = async () => {
  const data = await getPage(pageKey);
  return (
    <section className={`${styles.layout} showSmooth`}>
      <Aos 
      activeClassName={`${styles.active}`}
      className={styles.header}>
        <SectionTitle className={styles.title} title={data?.title} />
        <p className={`${styles.subTitle} `}>{data?.subTitle}</p>

      </Aos>
      <List page={data} categories={data?.categories} />
    </section>
  );
};

export default page;
