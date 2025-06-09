import styles from "./page.module.css";
import { getHomePage } from "./data.test";
import Hero from "@/Components/Home/Hero/Hero";
import Quote from "@/Components/Home/Quote/Quote";
import AboutUs from "@/Components/Home/AboutUs/AboutUs";
import News from "@/Components/Home/News/News";
import Testimonials from "@/Components/Home/Testimonials/Testimonials";
import GetInTouch from "@/Components/Home/GetInTouch/GetInTouch";
import Intro from "@/Components/Intro/Intro";
import WaveLines from "@/Components/Shared/WaveLines/WaveLines";
import StaticSection, {
  CSRSection,
} from "@/Components/Home/StaticSection/StaticSection";
import { ssrApi } from "@/utils/api";
import AnimatedBorderSection from "@/Components/Shared/AnimatedBorderSection/AnimatedBorderSection";
import FloatedSection from "@/Components/Shared/FloatedSection/FloatedSection";
import Img from "@/Components/Shared/img/Img";

const Home = async () => {
  const {
    heroSection = [],
    aboutUsSection = {},
    quoteSection = {},
    newsSection = {},
    testimonialSection = {},
    getInTouchSection = {},
  } = getHomePage();



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

  return (
    <section className={styles.layout}>
      <Intro />
      <Hero  data={heroSection} />
      {/* <CSRSection>
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
      </CSRSection> */}
      <GetInTouch data={getInTouchSection} />
    </section>
  );
};

export default Home;
