import BigCard from "@/components/Home/WhyUs/BigCard/BigCard";
import styles from "./AboutUs.module.css";
import MediaWrapper from "./MediaWrapper/MediaWrapper";
import SectionHead from "@/components/Home/SectionHead/SectionHead";

const AboutUs = ({ data = {} }) => {
  return (
    <section className={styles.container}>
      <SectionHead
        description={data?.description}
        title={data?.title}
        ShadowBgClassName={styles.ShadowBg}
      />
      <div className={`${styles.sections} flex wrap   page`}>
        {data?.points.map((val, i) => (
          <BigCard key={i} className={styles.BigCard} data={val} />
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
