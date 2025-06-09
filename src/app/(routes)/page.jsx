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
import { ssrApi } from "@/utils/api";
import AnimatedBorderSection from "@/components/Shared/AnimatedBorderSection/AnimatedBorderSection";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import Img from "@/components/Shared/img/Img";

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

// return (
//   <div
//   style={{
//     background:"black",
//     minHeight:"100vh"
//   }}
//   className={styles.textpage}>

//     <Img
//       disableSkeleton
//       className={styles.bgPoster}
//       url="/dashboard/logo-dark.png"
//     />
//   </div>
// )
