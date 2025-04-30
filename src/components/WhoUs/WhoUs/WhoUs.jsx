import styles from "./WhoUs.module.css";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import Media from "./Media/Media";

const WhoUs = ({ data = {} }) => {
  return (
    <div className={styles.container}>
      {data?.points?.map((item, index) => (
        <Aos
          threshold={0.3}
          delay={100}
          key={index}
          className={`${styles.section}`}
          activeClassName={`${styles.active}`}
        >
          <div className={`${styles.content} flex column just-sb`}>
            <div className={`${styles.top} flex just-sb`}>
              <h1 className={styles.title}> {item?.title}</h1>
              <h1 className={styles.number}>{`0${index + 1}`}</h1>
            </div>
            <div className={styles.bottom}>
              <p className={styles.description}>{item?.description}</p>
              <Media className={styles.media} media={item?.media} />
            </div>
          </div>
        </Aos>
      ))}
    </div>
  );
};

export default WhoUs;
