import React from "react";
import styles from "./Card.module.css";
import Img from "@/components/Shared/img/Img";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import { formatText, lineBreak } from "@/utils/text";
import DescriptionBox from "./DescriptionBox/DescriptionBox";
import Link from "@/components/Shared/Link/Link";

const Card = ({ index = 0, data = {} }) => {
  console.log(data?.jobTitle);
  

  
  const CardKey = `teamcard${index}`;
  return (
    <Aos
      threshold={0.6}
      delay={200}
      activeClassName={styles.active}
      className={`flex ${styles.card} just-sb`}
      style={{ position: "relative" }}
      id={CardKey}
    >
      <div className={`flex column gap5 ${styles.content}`}>
        <h1 className={`${styles.name} title-l`}>{data?.name}</h1>
        <h4
          className="title-s"
          dangerouslySetInnerHTML={{
             __html: formatText(data?.jobTitle, { dotBreak: true }),
          }}
        />
            {/* Social Links */}
        {data?.links?.length > 0 && (
          <div className={styles.socialLinks}>
            {data?.links?.map((item, idx) => (
              <div key={item?._id} className={styles.socialLinkItem}>
                <Link href={item?.link} className={styles.socialAnchor}>
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        )}
        <DescriptionBox CardKey={CardKey} description={data?.description} />

    
      </div>

      <Img className={styles.image} url={data?.image?.url} alt={data?.name} />
    </Aos>
  );
};

export default Card;
