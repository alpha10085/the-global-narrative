import styles from "./styles.module.css";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import { getPage } from "@/lib/pages";

import WordPullUpV2 from "@/components/Shared/Animtions/WordPullUpV2/WordPullUpV2";
import Form from "@/components/LetsCollaborate/Form/Form";

const page = async () => {
  const {
    title = "Get In touch",
    description = "For inquiries, press inquiries, or to schedule a meeting with our team",
    email = "contact@silverbacks-holding.com",
    linkedIn = "https://www.linkedin.com/company/silverbacks-holding",
  } = {};

  return (
    <section className={`${styles.section} ShowSmoothEffect`}>
      <div className={`${styles.top} flex-c column`}>
        <WordPullUpV2 delay={0.3} className={styles.title} text={title} />
        <Aos
          delay={50}
          className={`${styles.AnimtionWrap} `}
          activeClassName={styles.event}
        >
          <p className={styles.description}>{description}</p>
        </Aos>
      </div>
      <Form />
    </section>
  );
};

export default page;
