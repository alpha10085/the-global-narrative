import styles from "./styles.module.css";
// import { metadataHandler } from "@/utils/metadata";
// import { getPage } from "@/lib/pages";
import Clients from "@/components/Clients/Clients";
import { searchAndReplace } from "@/utils/text";
import { customers } from "./data.test";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Aos from "@/components/Shared/Animtions/Aos/Aos";

// export const generateMetadata = metadataHandler(getPage, `clients`);
const Page = async (props) => {
  // const {
  //   title = "",
  //   description = "",
  //   customers = [],
  // } = await getPage("customers-logos");

  const title = "Our Customers";
  const description =
    "Trusted by leading brands and businesses around the world.";
  const sectionTitle = `${searchAndReplace(title, " ", "-")}-main`;
  return (
    <main className={`${styles.layout} ShowSmoothEffect`}>
      <div className={`${styles.head} flex-c column gap15`}>
        <SectionTitle title={title} />
        <Aos delay={400} activeClassName={styles.active} className={styles.Aos}>
          <p>{description}</p>
        </Aos>
      </div>
      <Clients sectionTitle={sectionTitle} data={customers || []} />
    </main>
  );
};

export default Page;
