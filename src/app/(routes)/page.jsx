import styles from "./page.module.css";
import Hero from "@/components/Home/Hero/Hero";
import Quote from "@/components/Home/Quote/Quote";
import AboutUs from "@/components/Home/AboutUs/AboutUs";
import News from "@/components/Home/News/News";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import GetInTouch from "@/components/Home/GetInTouch/GetInTouch";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import { getPage } from "@/lib/pages";
import SSRFetcher from "@/components/Shared/SSRFetcher/SSRFetcher";
import {  pageMetadataHandler } from "@/utils/metadata";

export const generateMetadata = pageMetadataHandler(getPage, "landing");
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
      <SSRFetcher
        Component={News}
        options={{
          next: { revalidate: "1y", 
          tags: newsSection?.posts || ["news"] },
        }}
        data={newsSection}
        path={`/news/landing?ids=${newsSection?.posts}`}
      />
      <SSRFetcher
        Component={Testimonials}
        data={testimonialSection}
        options={{
          next: {
            revalidate: "1y",
            tags: testimonialSection?.posts || ["testimonials"],
          },
        }}
        path={`/testimonials/landing?ids=${testimonialSection?.posts}`}
      />
      <GetInTouch data={getInTouchSection} />
    </section>
  );
};

export default Home;
