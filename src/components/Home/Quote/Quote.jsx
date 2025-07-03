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
      <div className={`${styles.cards} flex just-sb gap20 wrap`}>
        {cards?.map((val) => (
          <Card {...val} key={val?._id} />
        ))}
      </div>
    </section>
  );
};

export default Quote;
