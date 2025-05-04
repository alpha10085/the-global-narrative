import styles from "./styles.module.css";
// import { metadataHandler } from "@/utils/metadata";
// import { getPage } from "@/lib/pages";
import Clients from "@/components/Clients/Clients/Clients";
import { searchAndReplace } from "@/utils/text";
import { customers } from "./data.test";

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
      <div className={styles.wrapper}>
        <div className={`${styles.headerContainer} flex-c column `}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <Clients sectionTitle={sectionTitle} data={customers || []} />
      </div>
    </main>
  );
};

export default Page;
