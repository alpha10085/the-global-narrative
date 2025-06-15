import styles from "./styles.module.css";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import Form from "@/components/LetsCollaborate/Form/Form";
import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";
import { getPage } from "@/lib/pages";
import { pageMetadataHandler } from "@/utils/metadata";

const pageKey = "contact-us";
export const generateMetadata = pageMetadataHandler(getPage, pageKey);
const page = async () => {
  const {
    title = "Join Our Journey",
    description = "For inquiries, press inquiries, or to schedule a meeting with our team",
  } = await getPage("contact-us");

  const siteKey = process.env.RECAPTCHA_SITE_KEY;
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
      </div>
    </section>
  );
};

export default page;
