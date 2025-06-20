import Img from "@/components/Shared/img/Img";
import styles from "./Card.module.css";
const testImage = [
  {
    url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1750114327/rxnwn4nkxvrrbtqnfwks.avif",
  },
  {
    url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1750396552/fiiypxrvkayanghe6szt.jpg",
  },
  {
    url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1749522830/mmyqhyefybez8r6coqdv.jpg",
  },
  {
    url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1750396704/ykq1dra5fxd7fkmbuozq.jpg",
  },
];
const Card = ({ className = "", index = 0, data = {} }) => {
  const url = testImage?.[index]?.url;
  return (
    <div
      style={{
        transitionDelay: `${((index - 1) * 0.5).toFixed(1)}s`,
      }}
      className={`${styles.container} 
      ${className}
      flex al-i-c w-100 just-sb`}
    >
      <div className={`${styles.left}  flex gap30`}>
        <h1
        
        >
          {index < 9 ? "0" : ""}
          {index + 1}
        </h1>
        <div className="flex column gap10">
          <h1 className={styles.title}>{data?.title}</h1>
          <p>{data.description}</p>
        </div>
      </div>
      <div className={styles.right}>
        <Img className={styles.poster} url={url} />
      </div>
    </div>
  );
};

export default Card;
