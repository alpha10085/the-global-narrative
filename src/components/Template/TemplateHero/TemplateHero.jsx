import Img from "@/components/Shared/img/Img";
import styles from "./TemplateHero.module.css";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import { ArrowOutwardIcon } from "@/components/Home/icons";
import ButtonScroll from "./Client";
import ScrollToContinueButton from "@/components/ScrollToContinueButton/ScrollToContinueButton";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import Threads from "@/components/Threads/Threads";

const images = [
  {
    url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1749523007/rozurwi0bfn19v4gfdsh.jpg",
  },
  {
    url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1749439677/ztuu5ismm9f9pywu48qk.jpg",
  },
  {
    url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1749441091/al7x42lbvyqoewv1kg21.jpg",
  },
];
const TemplateHero = ({
  pageTitle = "about us",
  title,
  description,
  poster,
}) => {
  return (
    <div className={`${styles.container} flex  gap50 `}>
      {/* <div className={`${styles.left} flex mt-50 gap15  column`}>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
        <SectionTitle delay={800} title={title} className={styles.title} />
        <Aos
          activeClassName={styles.active}
          className={styles.aosText}
          delay={600}
        >
          <p className={styles.description}>{description}</p>
        </Aos>
      </div> */}


      {/* <div className={styles.mesh}>
        <Threads color={"#0095ff"} fade={0.9} amplitude={3} />
      </div> */}
    </div>
  );
};

export default TemplateHero;
