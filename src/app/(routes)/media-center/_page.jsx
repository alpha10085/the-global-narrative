import { metadataHandler } from "@/utils/metadata";

// import { getPage } from "@/lib/pages";
import { getpage } from "./data.test";
import { Suspense } from "react";
import MediaCenter, { FallBack } from "@/Components/MediaCenter/MediaCenter";

export const generateMetadata = metadataHandler(getpage, `media-center`);
const Page = async (props) => {
  const data = await getpage(`media-center`);
  return (
    <main>
      <Suspense fallback={<FallBack />}>
        <MediaCenter page={data} categories={data?.categories} />
      </Suspense>
    </main>
  );
};

export default Page;
