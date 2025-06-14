"use client";
import MainLogo from "../MainLogo/MainLogo";
import { links } from "../NavBar/Links";
import Link from "../Shared/Link/Link";
import styles from "./footer.module.css";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ArrowBack } from "@mui/icons-material";
import { usePathname } from "@/hooks/useTranslations";
import { useEffect } from "react";
import { csrApi } from "@/utils/api";
import useAsyncQuery from "@/hooks/useAsyncQuery";

const hiddenPaths = ["/contact-us"];

const fetchFooter = async () => {
  const data = await csrApi.get("/components/footer");
  return data;
};

const Footer = () => {
  const { pathname } = usePathname();
  const dateNow = new Date().getFullYear();
  const { data, isLoading, error } = useAsyncQuery({
    queryKey: ["footer"],
    queryFn: fetchFooter,
    cache: "10m",
  });

  if (isLoading) return <div>Loading...</div>;

  // Check if data is available
  const { socialLinks = [] } = data || {};

  return (
    <footer
      id="footer-container"
      className={`${styles.footer} ${
        hiddenPaths.includes(pathname) ? styles.hide : ""
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
                <img
                  src={item?.url}
                  alt={`social-icon-${i}`}
                  className={styles.icon}
                />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <ul className={`${styles.list} flex column gap15 wrap`}>
            {links?.map((val, i) => (
              <li key={i}>
                <Link
                  data-cursor-label={`${val?.text} →`}
                  className={styles.link}
                  href={val?.href}
                >
                  {val?.text}
                </Link>
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
