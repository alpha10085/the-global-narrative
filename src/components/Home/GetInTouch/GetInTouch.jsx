import Img from "@/components/Shared/img/Img";
import SectionTitle from "../../SectionTitle/SectionTitle";
import styles from "./GetInTouch.module.css";
import Link from "@/components/Shared/LocalizedLink/Link";
import { ArrowForwardIosIcon, ArrowOutwardIcon } from "../icons";
import Aos from "@/components/Shared/Animtions/Aos/Aos";

const GetInTouch = ({ data = {} }) => {
  return (
    <div className={`${styles.container} flex al-i-c`}>
      <div className={`${styles.left} flex column gap20`}>
        <SectionTitle title={data?.title} />
        <Aos delay={400} activeClassName={styles.active} className={styles.aos}>
          <p className={styles.description}>{data?.description}</p>
        </Aos>
        <Aos
          delay={800}
          activeClassName={styles.active}
          className={`${styles.aos} flex gap10 al-i-c`}
        >
          <Link
            className={`${styles.link} flex gap5 al-i-c`}
            href={"/contact-us"}
          >
            <span className={`${styles.contnet} flex al-i-c`}>contact us</span>
            <span className={`${styles.arrow} flex-c`}>
              <ArrowOutwardIcon />
            </span>
          </Link>
        </Aos>
      </div>
      <Aos
          delay={800}
          activeClassName={styles.active}
          className={`${styles.aosPoster} `}
        >
      <Img className={styles.poster} url={data?.poster?.url} />
        </Aos>
    </div>
  );
};

export default GetInTouch;
