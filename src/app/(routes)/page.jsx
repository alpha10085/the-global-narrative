import styles from "./page.module.css";
import { getHomePage } from "./data.test";
import Hero from "@/components/Home/Hero/Hero";
import Quote from "@/components/Home/Quote/Quote";
import AboutUs from "@/components/Home/AboutUs/AboutUs";
import News from "@/components/Home/News/News";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import GetInTouch from "@/components/Home/GetInTouch/GetInTouch";

const Home = async () => {
  const {
    heroSection = [],
    aboutUsSection = {},
    quoteSection = {},
    newsSection = {},
    testimonialSection = {},
    getInTouchSection = {}
  } = getHomePage();
  return (
    <div className={styles.layout}>
      <Hero data={heroSection} />
      <AboutUs data={aboutUsSection} />
      <Quote data={quoteSection} />
      <News data={newsSection} />
      <Testimonials data={testimonialSection} />

      <GetInTouch  data={getInTouchSection} />
    </div>
  );
};

export default Home;
