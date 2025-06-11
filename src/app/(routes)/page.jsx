import styles from "./page.module.css";
import Hero from "@/components/Home/Hero/Hero";
import Quote from "@/components/Home/Quote/Quote";
import AboutUs from "@/components/Home/AboutUs/AboutUs";
import News from "@/components/Home/News/News";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import GetInTouch from "@/components/Home/GetInTouch/GetInTouch";
import WaveLines from "@/components/Shared/WaveLines/WaveLines";
import StaticSection, {
  CSRSection,
} from "@/components/Home/StaticSection/StaticSection";
import AnimatedBorderSection from "@/components/Shared/AnimatedBorderSection/AnimatedBorderSection";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
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
      <AboutUs data={aboutUsSection} />
      <WaveLines />
      <FloatedSection>
        <Quote data={quoteSection} />
        <WaveLines />
      </FloatedSection>
      <News data={newsSection} />
      <WaveLines colors={["#8927f2a8", "#00eaff", "#ff00d4"]} />
      <Testimonials data={testimonialSection} />
      {/* <GetInTouch data={getInTouchSection} /> */}
    </section>
  );
};

export default Home;
