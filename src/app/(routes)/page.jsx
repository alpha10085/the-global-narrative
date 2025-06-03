import styles from "./page.module.css";
import { getHomePage } from "./data.test";
import Hero from "@/_components/Home/Hero/Hero";
import Quote from "@/_components/Home/Quote/Quote";
import AboutUs from "@/_components/Home/AboutUs/AboutUs";
import News from "@/_components/Home/News/News";
import Testimonials from "@/_components/Home/Testimonials/Testimonials";
import GetInTouch from "@/_components/Home/GetInTouch/GetInTouch";
import Intro from "@/_components/Intro/Intro";
import WaveLines from "@/_components/Shared/WaveLines/WaveLines";
import StaticSection, {
  CSRSection,
} from "@/_components/Home/StaticSection/StaticSection";
import { ssrApi } from "@/utils/api";
import AnimatedBorderSection from "@/_components/Shared/AnimatedBorderSection/AnimatedBorderSection";
import FloatedSection from "@/_components/Shared/FloatedSection/FloatedSection";

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
      <Hero  data={heroSection} />
      <CSRSection>
        <AboutUs data={aboutUsSection} />
        <WaveLines />
        <FloatedSection>
        <Quote data={quoteSection} />
        <WaveLines />
        </FloatedSection>
        <div className={styles.spaceSection}></div>
          <div className={styles.childTwo}>
            <AnimatedBorderSection>
              <StaticSection mode="down" >
              <News data={newsSection} />
              <WaveLines colors={["#8927f2a8", "#00eaff", "#ff00d4"]} />
              <Testimonials data={testimonialSection} />
              </StaticSection>
            </AnimatedBorderSection>
          </div>
      </CSRSection>
      <GetInTouch data={getInTouchSection} />
    </section>
  );
};

export default Home;
