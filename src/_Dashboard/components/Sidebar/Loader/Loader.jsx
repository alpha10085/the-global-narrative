import Skeleton from "@/Components/Shared/Skeleton/Skeleton";
import styles from "./Loader.module.css";

const Loader = ({ theme = {}, active = false }) => {
  return (
    <div
      className={`${styles.layout} ${
        !active && styles.close
      } showSmooth flex column `}
    >
      <div className={`${styles.wrapper} showSmooth flex column gap5`}>
        {Array.from({
          length: 3,
        }).map((j, i) => (
          <div key={i} className="flex column just-sb ">
            <div className={`flex just-sb gap5 ${styles.item}`}>
              <Skeleton theme={theme.name} className={styles.icon} />
              <Skeleton theme={theme.name} className={styles.title} />
            </div>
            <div className={`${styles.list} flex column gap5`}>
              {Array.from({
                length: 3,
              }).map((j2, i2) => (
                <div
                  key={`${i}-${i2}`}
                  style={{
                    width: "75%",
                  }}
                  className={`flex  `}
                >
                  <Skeleton
                    theme={theme.name}
                    className={`${styles.title} ${styles.item}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className={`flex just-sb gap5 ${styles.item}`}>
          <Skeleton theme={theme.name} className={styles.icon} />
          <Skeleton theme={theme.name} className={styles.title} />
        </div>
        <div className={`flex just-sb gap5 ${styles.item}`}>
          <Skeleton theme={theme.name} className={styles.icon} />
          <Skeleton theme={theme.name} className={styles.title} />
        </div>
      </div>
      <div className={`${styles.bottombox}`}>
      <div className={`flex just-sb gap5 al-i-c ${styles.bottomboxwrap}`}>
        <Skeleton theme={theme.name} className={styles.iconprofile} />
        <Skeleton theme={theme.name} className={styles.titleprofile} />
      </div>
      </div>
    </div>
  );
};

export default Loader;
