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
          <div className={`${styles.ScoialLinks} flex gap40 al-i-c`}>
            {ScoialLinks?.map((val, i) => (
              <Link
                key={i}
                className={styles.ScoialLink}
                href={`/${val?.herf}`}
              >
               {
                val?.icon
               }
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <ul className={`${styles.list} flex column gap15 `}>
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
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path fill="#25F4EE" d="M20 8v26a6 6 0 1 1-6-6" />
      <path
        fill="#FE2C55"
        d="M26 8a6 6 0 0 0 6 6v4a10 10 0 0 1-6-2v14a12 12 0 1 1-12-12"
      />
      <path
        fill="#000000"
        d="M24 6v2c0 3.3 2.7 6 6 6h2v4a10 10 0 0 1-6-2v14a12 12 0 1 1-12-12v-4a6 6 0 0 0 6 6V8h4z"
      />
    </g>
  </svg>
);

export default Footer;
