'use client'
import styles from './Barcode.module.css'
import JsBarcode from "jsbarcode";
import { useEffect, useRef, useState } from "react";
import { delay } from "@/utils/time";
import Spinner from "@/_components/Shared/Spinner/Spinner";
const Barcode = ({
  className = '',
  value = null
}) => {
  const barcodeRef = useRef(null);
  const [eventLoading, setEventLoading] = useState(false);
  useEffect(() => {
    watchHandler();
  }, [value]);
  const watchHandler = async () => {
    if (barcodeRef.current && value) {
      setEventLoading(true);
      // Generate barcode on the canvas using the provided value
      JsBarcode(barcodeRef.current, value, {
        format: "CODE128", // Barcode type
        displayValue: false, // Display value under the barcode
      });
      await delay(500);
      setEventLoading(false);
    }
  };
  return (
    <div className={`${styles.container} flex-c ${className}`}>
      {eventLoading && <Spinner size={18} color='black' />}
      { <canvas
        className={` ${styles.barcode}   showSmooth   ${eventLoading && styles.hide
          }`}
        ref={barcodeRef}
      />}
    </div>
  );
};

export default Barcode;
