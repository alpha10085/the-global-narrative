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
import { pageMetadataHandler } from "@/utils/metadata";
import ServicesSection from "@/components/Home/Services/ServicesSection";
import SpaceSection from "@/components/SpaceSection/SpaceSection";

export const generateMetadata = pageMetadataHandler(getPage, "landing");
const Home = async () => {
  const {
    heroSection = [],
    aboutUsSection = {},
    servicesSection = {},
    quoteSection = {},
    newsSection = {},
    testimonialSection = {},
    getInTouchSection = {},
  } = await getPage("landing");

  return (
    <section className={styles.layout}>
      <Hero data={heroSection} />
      <div className={styles.staticWrapper}>
        <FloatedSection>
          {/* <AboutUs data={aboutUsSection} /> */}
          <SSRFetcher
            Component={ServicesSection}
            options={{
              next: {
                revalidate: "1y",
                tags: servicesSection?.services || ["service"],
              },
            }}
            data={servicesSection}
            path={`/service/landing?ids=${servicesSection?.services}`}
          />
          <Quote data={quoteSection} />
        </FloatedSection>
        {/* <div className={styles.wrapper}>
        <SSRFetcher
          Component={News}
          options={{
            next: { revalidate: "1y", tags: newsSection?.posts || ["news"] },
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
      </div> */}
        {/* <GetInTouch data={getInTouchSection} /> */}
         <SpaceSection style={{ background: "white" }} />
      </div>
    </section>
  );
};

export default Home;
