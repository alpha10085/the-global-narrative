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

export const generateMetadata = metadataHandler(getPage, `clients`);
const Page = async (props) => {
  const {
    title = "",
    description = "",
    clients = [],
  } = await getPage("clients-logos");

  const sectionTitle = `${searchAndReplace(title, " ", "-")}-main`;
  return (
    <main className={`${styles.layout} ShowSmoothEffect`}>
      <div className={`${styles.head} flex-c column gap15`}>
        <WordPullUpV2
          duration={0.4}
          delay={500}
          className={`${styles.title} title-xl `}
          text={title}
        />
        <Aos delay={400} activeClassName={styles.active} className={styles.Aos}>
          <p>{description}</p>
        </Aos>
      </div>
      <Clients sectionTitle={sectionTitle} data={clients || []} />
    </main>
  );
};

export default Page;
