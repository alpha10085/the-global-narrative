export const dynamic = "auto";
import List from "@/components/News/List/List";
import { getPage } from "@/lib/pages";
import { getpage } from "./data.test";

// export const generateMetadata = async () =>
//   await pageMetadataHandler(getpage, "");

const page = async () => {
  const data = await getpage("");
  return (
    <section
      // className={styles}
      id="news-Categories"
    >
      <List page={data} categories={data?.categories} />
    </section>
  );
};

export default page;
