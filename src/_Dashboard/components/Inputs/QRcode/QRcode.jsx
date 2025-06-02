
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";
import styles from "./QRcode.module.css";
import { useEffect, useRef, useState } from "react";
import { delay } from "@/utils/time";
import Spinner from "@/components/Shared/Spinner/Spinner";
// import { QRCodeSVG } from "qrcode.react";

const QRcode = ({
  onChange = () => "",
  show = true,
  theme,
  className = "",
  field = {},
  currentValue = "",
  error = null,
  watch = "",
    mode=""
}) => {
  // const [eventLoading, setEventLoading] = useState(false);

  // useEffect(() => {
  //   watchHandler();
  // }, [currentValue]);
  // const watchHandler = async () => {
  //   if (currentValue) {
  //     setEventLoading(true);
  //     // Generate QRcode on the canvas using the provided value
  //     await delay(500);
  //     setEventLoading(false);
  //   }
  // };

  return (
    <div
      id={handleReplaceDot(field?.name)}
      className={`flex column gap5 showSmooth ${styles.label} ${className}`}
    >
      <h1>{field?.label}</h1>
      {/* <div
        className={`${styles.container} ${mode === 'update' && styles?.full} flex-c ${theme.bgMedia} ${theme.bord20}`}
      >
        {currentValue ? eventLoading ? (
          <Spinner size={18} theme={theme} />
        ) : (
          <div className={`flex-c showSmooth ${styles.QRCode}`}>
            <QRCodeSVG className={`${styles.QRCodesvg}  `} value={currentValue} />
          </div>
        ) : ""}
      </div> */}
    </div>
  );
};

export default QRcode;
