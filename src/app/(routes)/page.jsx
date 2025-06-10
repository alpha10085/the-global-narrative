import styles from "./page.module.css";
import Hero from "@/componentss/Home/Hero/Hero";
import Quote from "@/componentss/Home/Quote/Quote";
import AboutUs from "@/componentss/Home/AboutUs/AboutUs";
import News from "@/componentss/Home/News/News";
import Testimonials from "@/componentss/Home/Testimonials/Testimonials";
import GetInTouch from "@/componentss/Home/GetInTouch/GetInTouch";
import WaveLines from "@/componentss/Shared/WaveLines/WaveLines";
import StaticSection, {
  CSRSection,
} from "@/componentss/Home/StaticSection/StaticSection";
import AnimatedBorderSection from "@/componentss/Shared/AnimatedBorderSection/AnimatedBorderSection";
import FloatedSection from "@/componentss/Shared/FloatedSection/FloatedSection";
import { getPage } from "@/lib/pages";

const Home = async () => {
  const {
    heroSection = [],
    aboutUsSection = {},
    quoteSection = {},
    newsSection = {},
    testimonialSection = {},
    getInTouchSection = {},
  } = await getPage("landing");

  return (
    <section className={styles.layout}>
      
      <Hero data={heroSection} />
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
            <StaticSection mode="down">
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
