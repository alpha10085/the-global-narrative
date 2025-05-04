"use client";
import MainLogo from "../MainLogo/MainLogo";
import { links } from "../NavBar/Links";
import Link from "../Shared/LocalizedLink/Link";
import styles from "./footer.module.css";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = ({ data = {} }) => {
  const dateNow = new Date().getFullYear();
  const ScoialLinks = [
    {
      label: "Facebook",
      _id: "facebook",
      herf: "/",
      icon: <FacebookIcon />,
    },
    {
      label: "X",
      _id: "x",
      herf: "/",
      icon: <XIcon />,
    },
    {
      label: "Instagram",
      _id: "instagram",
      herf: "/",
      icon: <InstagramIcon />,
    },
    {
      label: "LinkedIn",
      _id: "linkedin",
      herf: "/",
      icon: <LinkedInIcon />,
    },
    {
      label: "YouTube",
      _id: "youtube",
      herf: "/",
      icon: <YouTubeIcon />,
    },
    {
      label: "TikTok",
      _id: "tiktok",
      herf: "/",
      icon: <TikTokLogo />,
    },
  ];
  return (
    <footer id="footer-container" className={styles.footer}>
      <div className={`${styles.top} flex al-i-c just-sb`}>
        <div className={`${styles.left}  `}>
          <MainLogo theme="dark" classNameWrapper={styles.logo} />
          <div
            className={`${styles.ScoialLinks} flex gap40 wrap just-c al-i-c`}
          >
            {ScoialLinks?.map((val, i) => (
              <Link
                key={i}
                className={styles.ScoialLink}
                href={`/${val?.herf}`}
              >
                {val?.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <ul className={`${styles.list} flex column gap15 wrap`}>
            {links?.map((val, i) => (
              <li key={i}>
                <Link className={styles.link} href={val?.href}>
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
