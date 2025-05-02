import { metadataHandler } from "@/utils/metadata";

// import { getPage } from "@/lib/pages";
import { getpage } from "./data.test";
import List from "@/components/MediaCenter/List/List";

export const generateMetadata = metadataHandler(getpage, `media-center`);
const Page = async (props) => {
  const data = await getpage(`media-center`);
  return (
    <main>
      <List page={data} categories={data?.categories}/>
    </main>
  );
};

export default Page;
