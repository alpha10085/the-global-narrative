import Img from "@/Components/Shared/img/Img";
import styles from "./Card.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { SwiperSlide } from "swiper/react";
import AddLinkIcon from "@mui/icons-material/AddLink";

import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import DisplayMedia from "@/_Dashboard/components/Media/DisplayMedia/DisplayMedia";
import { memo } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Card = ({
  item,
  disabled,
  length = 0,
  index = 0,
  single,
  onDelete = () => { },
  moveDown = () => { },
  moveUp = () => { },
  className,
}) => {

  const { theme } = useTheme();

  const btnClassList = `${styles.btn} flex-c ${theme.bord10} ${theme.bg_overlay} ${theme.color}  `
  return (
    <div className={`${styles.card}  ${theme.bord20} ${single && styles.singleMedia} ${theme.background}`}>
      <DisplayMedia
        type={item?.mimetype}
        thumbnail={item?.thumbnail}
        theme={theme}
        className={`${styles.image} `}
        url={item?.url}
        mainClassName={styles.imagemain}
      />

      <div className={`${styles.options} flex-c gap10`}>
        {!single && index !== 0 && (
          <button

            onClick={moveUp}
            className={btnClassList}
          >

            <ArrowBackIcon />

          </button>
        )}

        <a target="_blank" href={item?.url}>
          <span
            className={btnClassList}
          >
            <AddLinkIcon />
          </span>
        </a>
        <span
          onClick={onDelete}
          className={btnClassList}
        >
          <DeleteIcon />
        </span>
        {!single && index + 1 !== length && (
          <button
            onClick={moveDown}
            className={btnClassList}
          >
            <ArrowForwardIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Card, (prev, next) => {
  return (
    prev?.item?._id === next?.item?._id && prev?.index === next?.index && prev?.disabled === next?.disabled
  );
});
