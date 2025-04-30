"use client";
import useTranslations from "@/hooks/useTranslations";
import styles from "./page.module.css";
import Settings from "@/_Dashboard/components/Settings/Settings";
import { useAuth } from "@/contexts/AuthProvider";

import LoaderLayout from "@/_Dashboard/components/LoaderLayout/LoaderLayout";
const Page = () => {
  const translations = useTranslations("Dashboard.setting", [
    "settings",
    "language",
    "accounts",
    "manage",
    "theme",
  ]);
  const { isLoading, session } = useAuth();
  return (
    <section className={`w-90 m-auto   ${styles.section}`}>
      <div className="coverHeader" />
      <h1 className={styles.title}>{translations?.settings}</h1>
      {isLoading ? (
        <LoaderLayout
          style={{
            height: "calc(100vh - 150px)",
          }}
        />
      ) : (
        <Settings translations={translations} />
      )}
    </section>
  );
};

export default Page;
