import Img from "@/components/Shared/img/Img";
import SectionTitle from "../../SectionTitle/SectionTitle";
import styles from "./GetInTouch.module.css";
import Link from "@/components/Shared/LocalizedLink/Link";
import { ArrowForwardIosIcon, ArrowOutwardIcon } from "../icons";
import MainLink from "@/components/MainLink/MainLink";

const GetInTouch = ({ data = {} }) => {
  return (
    <div className={`${styles.container} flex al-i-c`}>
      <div className={`${styles.left} flex column gap20`}>
        <SectionTitle title={data?.title} />
        <p className={styles.description}>{data?.description}</p>
        <div className="flex gap10 al-i-c">


        <MainLink text="Contact us" href={"/contact-us"} />
        {/* <Link className={`${styles.link} flex gap5 al-i-c`} href={"/contact-us"} >
        <span className={`${styles.contnet} flex al-i-c`}>
        contact us
        </span>
        <span className={`${styles.arrow} flex-c`}>
          <ArrowOutwardIcon />
        </span>    
        </Link> */}
    
        </div>
      </div>
      <Img className={styles.poster} url={data?.poster?.url} />
    </div>
  );
};

export default GetInTouch;
