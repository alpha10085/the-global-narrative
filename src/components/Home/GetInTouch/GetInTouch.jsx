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
      <div className={`${styles.container} flex-c column al-i-c`}>
        <div className={`${styles.top} flex-c column gap20`}>
          <SectionTitle title={data?.title} />
          <Aos
            delay={400}
            activeClassName={styles.active}
            className={`${styles.aos} flex-c`}
          >
            <p className={styles.description}>{data?.description}</p>
          </Aos>
          <Aos
            delay={800}
            activeClassName={styles.active}
            className={`${styles.aos} flex-c gap10 al-i-c`}
          >
            <MainLink text="Contact us" href={"/contact-us"} />
          </Aos>
        </div>
        <div className={styles.waves}>
          <WaveLines />
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
