'use client'
import { useEffect, useState } from "react";
const usCSR = () => {
  const [isCSR, setIsCSR] = useState(false);

  useEffect(() => {
    setIsCSR(true);
  }, []);
  return isCSR;
};

export default usCSR;
