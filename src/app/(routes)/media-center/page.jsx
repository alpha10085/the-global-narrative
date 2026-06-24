export const dynamic = "auto";
import styles from "./styles.module.css";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { getPage } from "@/lib/pages";
import { pageMetadataHandler } from "@/utils/metadata";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import List from "@/components/MediaCenter/List/List";
const pageKey = "media-center";
export const generateMetadata = pageMetadataHandler(getPage, pageKey);
const page = async () => {
  const data = await getPage(pageKey);
  return (
    <section className={`${styles.layout} showSmooth`}>
      <Aos activeClassName={`${styles.active}`} className={styles.header}>
        <SectionTitle className={styles.title} title={data?.title} />
        <p className={`${styles.subTitle} `}>{data?.subTitle}</p>
      </Aos>
      <List page={data} categories={data?.categories} />
    </section>
  );
};

export default page;
