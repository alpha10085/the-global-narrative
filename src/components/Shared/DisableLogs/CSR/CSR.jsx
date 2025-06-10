"use client";
import { useLayoutEffect } from "react";
import { disableConsole } from "../helpers";
const CSR = () => {
  useLayoutEffect(() => {
    disableConsole();
  }, []);
  disableConsole();
  return null;
};

export default CSR;
