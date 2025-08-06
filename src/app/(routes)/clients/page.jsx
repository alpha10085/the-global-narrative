import styles from "./styles.module.css";
// import { metadataHandler } from "@/utils/metadata";
// import { getPage } from "@/lib/pages";
import Clients from "@/components/Clients/Clients";
import { searchAndReplace } from "@/utils/text";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import { metadataHandler } from "@/utils/metadata";
import { getPage } from "@/lib/pages";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import Template from "@/components/Template/Template";

export const generateMetadata = metadataHandler(getPage, `clients-logos`);
const Page = async (props) => {
  const {
    title = "",
    description = "",
    clients = [],
  } = await getPage("clients-logos");

  const sectionTitle = `${searchAndReplace(title, " ", "-")}-main`;
  return (
    <Template color="blue" pageTitle={title} className={styles.main}>
      <Clients sectionTitle={sectionTitle} data={clients || []} />
    </Template>
  );
};

export default Page;
