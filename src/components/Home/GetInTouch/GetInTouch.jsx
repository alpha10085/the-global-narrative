import Img from "@/components/Shared/img/Img";
import SectionTitle from "../../SectionTitle/SectionTitle";
import styles from "./GetInTouch.module.css";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import MainLink from "@/components/MainLink/MainLink";
import { lineBreak } from "@/utils/text";
import FAQItem from "./FAQItem/FAQItem";


const GetInTouch = ({ data = {} }) => {
  return (
    <div className={`${styles.container} flex`}>
      <div className={`${styles.left} flex column gap20`}>
        <SectionTitle title={data?.title} className={styles.title} />
        <Aos
          delay={400}
          activeClassName={styles.active}
          className={`
          flex column
          gap10
          ${styles.aos}`}
        >
          {lineBreak(data?.description, ["?"])?.map((val, i) => (
            <p key={i} className={styles.description}>
              {val}
            </p>
          ))}
        </Aos>
        <Aos
          delay={800}
          activeClassName={styles.active}
          className={`${styles.aos} flex gap10 al-i-c`}
        >
          <MainLink
            text={data?.button?.label}
            href={"/contact-us"}
            className={styles.link}
          />
        </Aos>
      </div>
      
      <Aos
        delay={800}
        activeClassName={styles.active}
        className={`${styles.aosPoster} `}
      >
        <Img className={styles.poster} url={data?.poster?.url} />
      </Aos>

      {/* <div className={styles.faqList}>
        {data?.faqs?.map((faq, idx) => (
          <FAQItem
            key={faq?._id}
            question={faq?.question}
            answer={faq?.answer}
            animationDelay={idx * 150}
          />
        ))}
      </div> */}
    </div>
  );
};

export default GetInTouch;
