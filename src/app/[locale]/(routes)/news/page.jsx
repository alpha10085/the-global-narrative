export const dynamic = "auto";
import List from "@/components/News/List/List";
import { getPage } from "@/lib/pages";
import { getpage } from "./data.test";

// export const generateMetadata = async () =>
//   await pageMetadataHandler(getpage, "");

const page = async () => {
  const data = await getpage("")  
  return <List page={data} categories={data?.categories} />;
};

export default page;
