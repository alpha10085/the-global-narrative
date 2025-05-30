import WaveLines from "@/components/Shared/WaveLines/WaveLines";
import styles from "./styles.module.css";
import Intro from "@/components/Intro/Intro";

const Page = async (props) => {
  return (
    <section className={`${styles.container} flex-c`}>
      <WaveLines />
      <Intro />
    </section>
  );
};

export default Page;
