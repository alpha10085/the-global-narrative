
import styles from "./Barcode.module.css";
import JsBarcode from "jsbarcode";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ScreenRotationAltIcon from "@mui/icons-material/ScreenRotationAlt";
import { delay } from "@/utils/time";
import Spinner from "@/_components/Shared/Spinner/Spinner";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";
const Barcode = ({
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

  const [popupmode, setPopupmode] = useState(false);
  const [rotatemode, setRotatemode] = useState(false);
  const [eventLoading, setEventLoading] = useState(false);
  const barcodeRef = useRef(null);
  useEffect(() => {
    watchHandler();
  }, [currentValue]);
  const watchHandler = async () => {
    if (barcodeRef.current && currentValue) {
      setEventLoading(true);
      // Generate barcode on the canvas using the provided value
      JsBarcode(barcodeRef.current, currentValue, {
        format: "CODE128", // Barcode type
        displayValue: false, // Display value under the barcode
      });
      await delay(500);
      setEventLoading(false);
    }
  };
  const onChangeRotatemode = () => {
    setRotatemode(!rotatemode);
  };
  const onChangepopupmode = () => {
    if (popupmode) {
      setRotatemode(false);
    }
    setPopupmode(!popupmode);
  };

  const openPopupMode = () => {
    if (popupmode || !currentValue) return;
    setPopupmode(true);
  };
  return (
    <div
      id={handleReplaceDot(field?.name)}
      className={`flex column gap10 showSmooth ${styles.label} ${className}`}
    >
      <h1>{field?.label}</h1>
      <div
        onClick={openPopupMode}
        className={`${styles.container}  ${mode === 'update' && styles?.full}  flex-c ${theme.bgMedia} ${theme.bord20}`}
      >
        <div
          className={`${styles.wrapper} flex-c ${popupmode && styles.popupmode
            }
          `}
        >
          <div
            className={`flex-c column gap20
            ${styles.rotatewrapper}
          ${rotatemode && styles.rotatemode}
          `}
          >
            {popupmode && (
              <div className={`flex-c  gap10`}>
                <button
                  className={`${styles.btn} ${theme.button}  `}
                  onClick={onChangeRotatemode}
                >
                  <ScreenRotationAltIcon />
                </button>

                <button
                  className={`${styles.btn} ${theme.button} `}
                  onClick={onChangepopupmode}
                >
                  <CloseIcon />
                </button>
              </div>
            )}

            {eventLoading && <Spinner size={18} theme={theme} />}
             <canvas
              className={` ${styles.barcode} ${rotatemode && styles.rotatemode
                }  showSmooth   ${eventLoading && styles.hide}`}
              ref={barcodeRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barcode;
