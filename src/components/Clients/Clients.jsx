"use client";
import { useInView } from "react-intersection-observer";
import styles from "./Clients.module.css";
import Img from "@/components/Shared/img/Img";
import Aos from "../Shared/Animtions/Aos/Aos";

const Clients = ({ data, sectionTitle }) => {
  return (
    <section
      id={sectionTitle}
      className={`${styles.section} ShowSmoothEffect `}
    >
      <Aos
        activeClassName={styles.active}
        className={`${styles.list} flex al-i-c wrap`}
      >
        {data?.map((val, ind) => (
          <Logo key={ind} item={val} ind={ind} />
        ))}
      </Aos>
    </section>
  );
};

const Logo = ({ item, ind }) => {
  return (
    <div
      style={{
        transitionDelay: `${ind * 0.4 + 0.5}s`,
      }}
      className={styles.logo}
    >
      <Img
        url={item?.logo?.url}
        alt={item?.title}
        withEffect
        disableSkeleton
        className={`${styles.logo} `}
      />
    </div>
  );
};

export default Clients;
