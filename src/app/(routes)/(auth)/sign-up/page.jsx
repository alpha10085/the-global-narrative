"use client";
import React from "react";
import styles from "./page.module.css";
import Registration from "@/components/Auth/Registration/Registration";
import Link from "@/components/Shared/Link/Link";
import useTranslations from "@/hooks/useTranslations";
const SignUp = ({}) => {
  const translations = useTranslations("pages", [
    "signUp.createAnAccount",
    "login.login",
    "signUp.or",
  ]);
  return (
    <section
      className={`page flex-c column ${styles.section} ShowSmoothEffect`}
    >
      <h1 className={` ${styles.title}`}>
        {translations?.signUp?.createAnAccount}
      </h1>
      <Registration />
      <p className={styles.lineor}>{translations?.signUp?.or}</p>
      <Link className={styles.link} href={`/log-in`}>
        {translations?.login?.login}
      </Link>
    </section>
  );
};

export default SignUp;
