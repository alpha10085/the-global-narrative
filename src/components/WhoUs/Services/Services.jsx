import React from "react";
import styles from "./Services.module.css";
import Img from "@/components/Shared/img/Img";
import ShadowBg from "@/components/ShadowBg/ShadowBg";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import SectionHead from "@/components/Home/SectionHead/SectionHead";
import BigCard from "@/components/Home/WhyUs/BigCard/BigCard";

const Services = ({ data = {} }) => {
  return (
    <section className={styles.section}>
      <SectionHead
        description={data?.description}
        title={data?.title}
        centerMode
        className_title={styles.title}
        emoji="/chart-increasing.png"
      />
      <Aos
        className={styles.container}
        activeClassName={styles.fadeUp}
        delay={300}
      >
        {data?.features?.map((val, index) => (
          <BigCard
            mediaClassName={styles.mediaClassName}
            key={index}
            data={val}
            style={{
              animationDelay: `${0.2 * index + 0.3}s`,
            }}
            className={styles.BigCard}
          />
        ))}
      </Aos>
    </section>
  );
};

export default Services;
