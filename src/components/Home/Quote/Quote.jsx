import Aos from "@/components/Shared/Animtions/Aos/Aos";
import Card from "./Card/Card";
import styles from "./Quote.module.css";
import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
const Quote = ({ data = {} }) => {
  const { title, description, cards = [] } = data;

  return (
    <section className={styles.section}>
      <div className={`flex al-i-c gap50 ${styles.content}`}>
        {title && (
          <WordPullUpV2
            duration={0.6}
            delay={200}
            className={`${styles.title}`}
            text={title}
          />
        )}
        <div className={`${styles.description} flex   column `}>
          {description}
        </div>
      </div>
      <Aos
        threshold={0.3}
        delay={300}
        activeClassName={styles.active}
        className={`${styles.cards} flex just-sb gap20 wrap`}
      >
        {cards?.map((val, index) => (
          <Card className={styles.card} index={index} {...val} key={val?._id} />
        ))}
      </Aos>
    </section>
  );
};

export default Quote;
