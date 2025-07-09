import Img from "@/components/Shared/img/Img";
import styles from "./Card.module.css";
import Aos from "@/components/Shared/Animtions/Aos/Aos";
import { lineBreak } from "@/utils/text";
import Link from "@/components/Shared/Link/Link";

const Card = ({ className = "", data = {}, index = 1 }) => {
  const lines = lineBreak(data?.keyPoints, ["."], true)?.slice(0, 8);
  return (
    <Aos
      threshold={0.5}
      activeClassName={styles.active}
      className={`${styles.container}   ${className} `}
    >
      <div id={`id_${data?._id}`} className={`flex ${styles.wrapper}`}>
        <div className={`${styles.content}  column gap15 flex`}>
          <div className={`${styles.head} flex column gap10`}>
            <h1 className={styles.title}>{data?.title}</h1>
            <h1 className={styles.subTitle}>{data?.subTitle}</h1>
          </div>
          <div className={`${styles.description} gap10 flex column`}>
            {lineBreak(data?.description).map((val, i) => (
              <p className="description-m" key={i}>
                {val}
              </p>
            ))}
          </div>
          <div className={`${styles.keypoints} flex column gap20`}>
            {lines.map((val, i) => (
              <div
                key={i}
                style={{
                  transitionDelay: `${i * 0.2 + 1.5}s`,
                }}
                className={styles.point}
              >
                {val}
              </div>
            ))}
          </div>
          {data?.projects?.length > 0 ? (
            <div
              style={{
                transitionDelay: `${0.2 + 1.2 + lines?.length * 0.2}s`,
              }}
              className={`flex column gap10 ${styles.projects}`}
            >
              <h1
                style={{
                  transitionDelay: `${0.2 + 1.2 + lines?.length * 0.2}s`,
                }}
                className={styles.projectstitle}
              >
                projects
              </h1>
              {data?.projects?.map((val, i) => (
                <Link
                  target="_blank"
                  key={val?._id}
                  style={{
                    transitionDelay: `${i * 0.2 + 2 + lines?.length * 0.2}s`,
                  }}
                  href={val?.link}
                  className={`${styles.project}`}
                >
                  <Img className={styles.posterImg} url={val?.poster?.url} />
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.posterWrapper}>
          <Img url={data?.poster?.url} className={styles.poster} />
          <h1 className={styles.subTitlePoster}>{data?.title}</h1>
        </div>
      </div>
    </Aos>
  );
};

export default Card;
