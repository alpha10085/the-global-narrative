import WaveLines from "@/components/Shared/WaveLines/WaveLines";
import styles from "./styles.module.css";
import Intro from "@/components/Intro/Intro";
import AnimatedBorderSection from "@/components/AnimatedBorderSection/AnimatedBorderSection";

const Page = async (props) => {
  return (
    <section className={`${styles.container} flex-c`}>
    <AnimatedBorderSection />
    </section>
  );
};

export default Page;
