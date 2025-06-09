import Spinner from "@/components/Shared/Spinner/Spinner";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={`${styles.container} flex-c`}>
      <Spinner />
    </div>
  );
};

export default Loading;
