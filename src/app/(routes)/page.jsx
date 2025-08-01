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
import SpaceSection from "@/components/SpaceSection/SpaceSection";
import ServicesSection from "@/components/Home/Services/ServicesSection";
import Clients from "@/components/Home/Clients/Clients";

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
    clientsSection = []
  } = await getPage("landing");

  return (
    <section className={styles.layout}>
      <Hero data={heroSection} />
      <div className={styles.staticWrapper}>
        <AboutUs data={aboutUsSection} />
        {/* <SSRFetcher
          Component={Clients}
          options={{
            next: { revalidate: "1y", tags: clientsSection || ["news"] },
          }}
          data={{}}
         
          path={`/clients/landing?ids=${clientsSection}`}
        /> */}
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

        <div className={styles.wrapper}>
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
        </div>
        <GetInTouch data={getInTouchSection} />
        <SpaceSection style={{ background: "white" }} />
      </div>
    </section>
  );
};

export default Home;
