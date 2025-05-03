import styles from "./page.module.css";
import { getHomePage } from "./data.test";
import Hero from "@/components/Home/Hero/Hero";
import Quote from "@/components/Home/Quote/Quote";
import AboutUs from "@/components/Home/AboutUs/AboutUs";

const Home = async () => {
  const {
    heroSection = [],
    aboutUsSection = {},
    quoteSection = {},
  } = getHomePage();
  return (
    <div className={styles.layout}>
      <Hero data={heroSection} />
      <AboutUs data={aboutUsSection} />
      <Quote data={quoteSection} />
    </div>
  );
};

export default Home;
