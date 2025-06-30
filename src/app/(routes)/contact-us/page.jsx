import styles from "./styles.module.css";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import Form from "@/components/LetsCollaborate/Form/Form";
import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";
import { getPage } from "@/lib/pages";
import { pageMetadataHandler } from "@/utils/metadata";
import {
  AttachEmailIcon,
  LocalPhoneIcon,
  LocationPinIcon,
} from "@/components/icons";
import Threads from "@/components/Threads/Threads";

const pageKey = "contact-us";
export const generateMetadata = pageMetadataHandler(getPage, pageKey);
const page = async () => {
  const {
    information = {},
    title = "Join Our Journey",
    description = "For inquiries, press inquiries, or to schedule a meeting with our team",
  } = await getPage("contact-us");
  const {
    Address = "Building 4/D/6, 5th Floor Nasr Street, New Maadi, Cairo, Egypt",
    phone = "(+202) 251 745 07",
    email = "info@globalnarrative.com",
  } = information;

  const siteKey = process.env.RECAPTCHA_SITE_KEY;
  return (
    <section
      id="active-section"
      data-offset="-150"
      className={`${styles.section} flex ShowSmoothEffect`}
    >
      <div className={styles.bgwrapper}>
        <div className={styles.bg}>
          <Threads
            color="#add8e6"
            amplitude={2}
            distance={0.3}
            fade={1}
            className={styles.canvas}
          />
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
        <Form siteKey={siteKey} />
        <Aos
          activeClassName={styles.active}
          className={`${styles.info} flex wrap gap25 just-fs`}
        >
          <div 
          style={{
            animationDelay:"1.5s"
          }}
          className={`${styles.item} flex gap15`}>
            <div className="flex-c gap15">
              <LocationPinIcon />
            </div>
            <div className={styles.value}>{Address}</div>
          </div>

          <div 
          style={{
            animationDelay:"1.8s"
          }}
          className={`${styles.item} flex gap15`}>
            <div className="flex-c gap15">
              <LocalPhoneIcon />
            </div>
            <div className={styles.value}>{phone}</div>
          </div>
          <div 
          style={{
            animationDelay:"2s"
          }}
          className={`${styles.item} flex gap15`}>
            <div className="flex-c gap15">
              <AttachEmailIcon />
            </div>
            <div className={styles.value}>{email}</div>
          </div>
        </Aos>
      </div>
    </section>
  );
};

export default page;
