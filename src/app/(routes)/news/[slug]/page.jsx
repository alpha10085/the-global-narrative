import Img from "@/components/Shared/img/Img";
import styles from "./styles.module.css";
import FormatText from "@/components/Shared/FormatText/FormatText";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import { ArrowBackIosIcon } from "@/components/NewsDetails/icons";
import { formatDate } from "@/utils/date";
import { calcReadingTime } from "@/components/NewsDetails/helpers";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import { getOneNewsData } from "@/lib/news";
import LinkTransition from "@/components/Shared/LinkTransition/LinkTransition";

const Page = async (props) => {
  const { slug = "" } = await props.params;
  const data = await getOneNewsData(slug)

  return (
    <section className={`${styles.container} showSmooth`}>
      <FloatedSection>
        {/* header */}
        <div className={styles.header}>
          <div className={`${styles.left} flex al-i-c gap15`}>
            <LinkTransition href={"/news"} className={`${styles.arrow} flex-c`}>
              <ArrowBackIosIcon />
            </LinkTransition>
            <span>Back</span>
          </div>
          <div className={styles.right}></div>
        </div>
        {/*  Poster */}
        <Aos
          delay={400}
          activeClassName={styles.aosActive}
          className={styles.poster}
        >
          <Img
            disableSkeleton
            url={data?.poster?.url}
            alt={data?.title}
            className={styles.image}
          />
        </Aos>
        {/*  details */}
        <Aos
          delay={400}
          activeClassName={styles.aosActive}
          className={styles.details}
        >
          <div className={`${styles.top} flex gap10`}>
            <div className="flex column gap5">
              <span className={styles.label}>date</span>
              <span className={styles.date}>{formatDate(data?.date)}</span>
            </div>
            <div className="flex column gap5">
              <span className={styles.label}>Reading time</span>
              <span className={styles.date}>
                {calcReadingTime(data?.content)}
              </span>
            </div>
          </div>
          <h2>{data?.title}</h2>
        </Aos>
      </FloatedSection>

      {/* Bottom Section */}

      <div
        id="active-section"
        className={`${styles.content} flex gap20 column`}
      >
        <FormatText
          className={`${styles.cardDescription}`}
          text={data?.content}
        />
      </div>
    </section>
  );
};

export default Page;
