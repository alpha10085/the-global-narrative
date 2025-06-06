// NotFound.js

import React from "react";
import styles from "./not-found.module.css";
import Link from "@/Components/Shared/Link/Link";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const NotFound = () => {
  return (
    <div
      className={`${styles.notFound} flex-c   w-75 m-auto h-100  showSmooth`}
    >
      <div className=" flex column al-i-c just-c  gap10">
        <h1 className="">404</h1>
        <h2 className="mb-10 ">Page Not Found</h2>
        <h3 className=" ">
          Sorry, the page you are looking for does not exist.
        </h3>

        <Link className={`${styles.btn} flex-c gap5`} href={"/dashboard"}>
          Back to dashboard
          <ArrowForwardIosIcon />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
