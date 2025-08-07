"use client";
import MainLogo from "../MainLogo/MainLogo";
import { enabledLinks } from "../NavBar/helpers";
import { links } from "../NavBar/Links";
import Img from "../Shared/img/Img";
import Link from "../Shared/Link/Link";
import LinkTransition from "../Shared/LinkTransition/LinkTransition";
import styles from "./footer.module.css";
import { usePathname } from "@/hooks/useTranslations";

const hiddenPaths = ["/contact-us"];

const Footer = ({ data = {} }) => {
  const { pathname } = usePathname();
  const dateNow = new Date().getFullYear();

  // Check if data is available
  const { socialLinks = [] } = data || {};

  return (
    <footer
      id="footer-container"
      className={`${styles.footer} ${
        hiddenPaths?.includes(pathname) ? styles.hide : ""
      }`}
    >
      <div className={`${styles.top} flex al-i-c just-sb`}>
        <div className={`${styles.left}  `}>
          <MainLogo theme="dark" classNameWrapper={styles.logo} />
          <div
            className={`${styles.ScoialLinks} flex gap40 wrap just-c al-i-c`}
          >
            {socialLinks?.map((item, i) => (
              <a
                key={item?._id}
                href={item?.link}
                className={styles.ScoialLinks}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Img
                  url={item?.url}
                  alt={`social-icon-${i}`}
                  disableSkeleton
                  className={styles.icon}
                
                />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <ul className={`${styles.list} flex column gap15 wrap`}>
            {enabledLinks?.map((val, i) => (
              <li key={i}>
                <LinkTransition
                  data-cursor-label={`${val?.text} →`}
                  className={styles.link}
                  href={val?.href}
                >
                  {val?.text}
                </LinkTransition>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
const TikTokLogo = () => (
  <svg
    className={styles.TikTokLogo}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="white"
  >
    <path d="M224 72c-26.51 0-48-21.49-48-48h-40v168a40 40 0 1 1-40-40v-40a80 80 0 1 0 80 80V88.47A87.9 87.9 0 0 0 224 96Z" />
  </svg>
);

export default Footer;

// FloatedSection
