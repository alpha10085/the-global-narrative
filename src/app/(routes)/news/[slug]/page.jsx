import Img from "@/components/Shared/img/Img";
import { getFakeOneNews } from "../data.test";
import styles from "./styles.module.css";
import SideBar from "./SideBar";

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
      <div className={styles.content}>
        {/* Left: Sticky Nav */}
        <SideBar data={data} />

        {/* Right: Description Sections */}
        <main className={styles.main}>
          <p className="mb-15">{data?.description}</p>
          {data?.content?.map((section, index) => (
            <section
              key={index}
              id={`section-${index}`}
              className={styles.section}
            >
              <h2>{section?.title}</h2>
              <p>{section?.description}</p>
            </section>
          ))}
        </main>
      </div>
    </section>
  );
};

export default Page;
