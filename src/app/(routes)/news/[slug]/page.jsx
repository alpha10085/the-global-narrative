import Img from "@/components/Shared/img/Img";
import { getFakeOneNews } from "../data.test";
import styles from "./styles.module.css";
import FormatText from "@/components/Shared/FormatText/FormatText";

const Page = async (props) => {
  const { slug = "" } = await props.params;
  const data = getFakeOneNews(slug);

  return (
    <section className={styles.container}>
      {/* Top Poster */}
      <div className={styles.poster}>
        <Img
          url={data?.poster?.url}
          alt={data?.title}
          className={styles.image}
        />
      </div>

      {/* Bottom Section */}
      <div className={`${styles.content} flex gap20 column`}>
        <h1>{data?.title}</h1>
        <FormatText
          className={`${styles.cardDescription}`}
          text={data?.content}
        />
      </div>
    </section>
  );
};

export default Page;
