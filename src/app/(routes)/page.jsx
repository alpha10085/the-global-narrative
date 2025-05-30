import styles from "./page.module.css";
import { getHomePage } from "./data.test";
import Hero from "@/components/Home/Hero/Hero";
import Quote from "@/components/Home/Quote/Quote";
import AboutUs from "@/components/Home/AboutUs/AboutUs";
import News from "@/components/Home/News/News";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import GetInTouch from "@/components/Home/GetInTouch/GetInTouch";
import Intro from "@/components/Intro/Intro";
import WaveLines from "@/components/Shared/WaveLines/WaveLines";
import StaticSection, {
  CSRSection,
} from "@/components/Home/StaticSection/StaticSection";

const Home = async () => {
  const {
    heroSection = [],
    aboutUsSection = {},
    quoteSection = {},
    newsSection = {},
    testimonialSection = {},
    getInTouchSection = {},
  } = getHomePage();
  return (
    <section className={styles.layout}>
      <Intro />
      <Hero enableAutoPlay={false} data={heroSection} />
      <CSRSection>
        <AboutUs data={aboutUsSection} />
        <WaveLines />
        <Quote data={quoteSection} />
        
        <WaveLines />
        <div className={styles.childTwo}>
          <StaticSection mode="down" />
          <News data={newsSection} />
           <WaveLines />
          <Testimonials data={testimonialSection} />
        </div>
      </CSRSection>
      <GetInTouch data={getInTouchSection} />
    </section>
  );
};

export default Home;

{
  /* <News data={newsSection} />
  <Testimonials data={testimonialSection} /> */
}
