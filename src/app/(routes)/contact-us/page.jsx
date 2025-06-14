import styles from "./styles.module.css";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import Form from "@/components/LetsCollaborate/Form/Form";
import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "@/components/Shared/Link/Link";
const TikTokLogo = () => (
  <svg
    className={styles.TikTokLogo}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
  
  >
    <path d="M224 72c-26.51 0-48-21.49-48-48h-40v168a40 40 0 1 1-40-40v-40a80 80 0 1 0 80 80V88.47A87.9 87.9 0 0 0 224 96Z" />
  </svg>
);
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
const page = async () => {
  const {
    title = "Join Our Journey",
    description = "For inquiries, press inquiries, or to schedule a meeting with our team",
    email = "contact@silverbacks-holding.com",
    linkedIn = "https://www.linkedin.com/company/silverbacks-holding",
  } = {};

  return (
    <section
      id="active-section"
      data-offset="-150"
      className={`${styles.section} flex ShowSmoothEffect`}
    >
      <div className={styles.bgwrapper}>
        <div className={styles.bg}>
          <AnimatedBackground
            speed={0.5}
            color={[0, 1, 1]}
            mouseReact={false}
          />
          <div className={`flex gap30 al-i-c just-c wrap ${styles.bottomBox}`}>
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
      </div>
      <div className={`${styles.content} flex column`}>
        <div className={`${styles.top} flex column`}>
          <h1 className={styles.title}>{title}</h1>
          <Aos
            delay={6 * 100 + 500}
            className={`${styles.AnimtionWrap} `}
            activeClassName={styles.event}
          >
            <p className={styles.description}>{description}</p>
          </Aos>
        </div>
        <Form />
      </div>
    </section>
  );
};

export default page;
