"use client"
import { useInView } from "react-intersection-observer";
import styles from "./Clients.module.css";
import Img from "@/components/Shared/img/Img";

const Clients = ({ data, sectionTitle }) => {
  return (
    <section
      id={sectionTitle}
      className={`${styles.section} ShowSmoothEffect `}
    >
      <div className={`${styles.list} flex al-i-c wrap`}>
        {data?.map((val, ind) => (
          <Logo key={ind} item={val} ind={ind} />
        ))}
      </div>
    </section>
  );
};

const Logo = ({ item, ind }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
    delay: 300,
  });
  return (
    <a target="_blank" href={item?.link} ref={ref}>
      <Img
        url={item?.logo?.url}
        alt={item?.title}
        withEffect
        disableSkeleton
        className={`${styles.logo} ${inView ? styles.event : ""}`}
      />
    </a>
  );
};

export default Clients;
