import Img from "@/components/Shared/img/Img";
import SectionTitle from "../../SectionTitle/SectionTitle";
import styles from "./GetInTouch.module.css";
import Link from "@/components/Shared/LocalizedLink/Link";
import { ArrowForwardIosIcon, ArrowOutwardIcon } from "../icons";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import MainLink from "@/components/MainLink/MainLink";
import WaveLines from "@/components/Shared/WaveLines/WaveLines";

const GetInTouch = ({ data = {} }) => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} flex-c al-i-c`}>
        <div className={`${styles.left} flex-c column gap20`}>
          <SectionTitle title={data?.title} />
          <Aos
            delay={400}
            activeClassName={styles.active}
            className={styles.aos}
          >
            <p className={styles.description}>{data?.description}</p>
          </Aos>
          <Aos
            delay={800}
            activeClassName={styles.active}
            className={`${styles.aos} flex gap10 al-i-c`}
          >
            <MainLink text="Contact us" href={"/contact-us"} />
          </Aos>
          <div className={styles.waves}>
            <WaveLines />
          </div>
        </div>
        {/* <Aos
        delay={800}
        activeClassName={styles.active}
        className={`${styles.aosPoster} `}
      >
        <Img className={styles.poster} url={data?.poster?.url} />
      </Aos> */}
      </div>
    </div>
  );
};

export default GetInTouch;
