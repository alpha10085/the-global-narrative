import Skeleton from "../Shared/Skeleton/Skeleton";

import styles from "./footer.module.css";
const Fallback = () => {
  return <Skeleton className={styles.loader} />;
};

export default Fallback;
