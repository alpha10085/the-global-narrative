"use client";
import React from "react";
import styles from "./page.module.css";
import Login from "@/_components/Auth/login/Login";
import useTranslations from "@/hooks/useTranslations";

const Page = () => {
  const translations = useTranslations("pages.login", [
    "welcome",
    "email",
    "password",
    "login",
    "message",
    "terms",
    "privacy",
  ]);

  return (
    <main className={` ${styles.section} flex-c ShowSmoothEffect `}>
      <div className={`flex-c  column  gap10 ${styles.wrapper}`}>
        <h1 className={`  col-black t-up  m-auto mb30 ${styles.title}`}>
          {translations?.welcome}
        </h1>
        <Login translations={translations} />
      </div>
    </main>
  );
};

export default Page;
