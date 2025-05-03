import styles from "./page.module.css";
import { getHomePage } from "./data.test";
import Hero from "@/components/Home/Hero/Hero";
import Quote from "@/components/Home/Quote/Quote";
import AboutUs from "@/components/Home/AboutUs/AboutUs";
import News from "@/components/Home/News/News";

const Home = async () => {
  const {
    heroSection = [],
    aboutUsSection = {},
    quoteSection = {},
    newsSection = {}
  } = getHomePage();
  return (
    <div className={styles.layout}>
      <Hero data={heroSection} />
      <AboutUs data={aboutUsSection} />
      <Quote data={quoteSection} />
      <News data={newsSection} />
    </div>
  );
};

export default Home;
