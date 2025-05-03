import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { getAboutUSPage } from "./data.test";
import styles from "./styles.module.css";
import Hero from "@/components/AboutUs/Hero/Hero";

const Page = async (props) => {
  const { hero = {} } = getAboutUSPage();
  return (
    <section className={`${styles.container} `}>
     <Hero data={hero} />
    </section>
  );
};

export default Page;
