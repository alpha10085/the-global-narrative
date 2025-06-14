import styles from "./page.module.css";
import Hero from "@/components/Home/Hero/Hero";
import Quote from "@/components/Home/Quote/Quote";
import AboutUs from "@/components/Home/AboutUs/AboutUs";
import News from "@/components/Home/News/News";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import GetInTouch from "@/components/Home/GetInTouch/GetInTouch";
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
      <FloatedSection>
        <AboutUs data={aboutUsSection} />
        <Quote data={quoteSection} />
      </FloatedSection>
      <News data={newsSection} />
      <Testimonials data={testimonialSection} />
      <GetInTouch data={getInTouchSection} />
    </section>
  );
};

export default Home;
