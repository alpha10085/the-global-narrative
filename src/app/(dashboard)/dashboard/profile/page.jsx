"use client";

import { useAuth } from "@/contexts/AuthProvider";
import ProfileForm from "@/_Dashboard/_Components/Profile/ProfileForm/ProfileForm";
import styles from "./page.module.css";
import PasswordForm from "@/_Dashboard/_Components/Profile/PasswordForm/PasswordForm";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import useTranslationsDashboard from "@/_Dashboard/hooks/useTranslationsDashboard";
const Page = () => {
  const translations = useTranslationsDashboard(
    [],
    [
      "noChanges",
      "save",
      "saveing",
      "profile.displayName",
      "inputs.phone",
      "inputs.phone_ph",
      "inputs.role",
      "inputs.email",
      "inputs.fullName",
      "inputs.role_ph",
      "inputs.email_ph",
      "inputs.fullName_ph",
      "inputs.readOnly",
      // password form
      "inputs.currentPassword",
      "inputs.currentPassword_ph",
      "inputs.newPassword",
      "inputs.newPassword_ph",
    ]
  );
  const { theme } = useTheme();
  const auth = useAuth();
  const { session, isLoading } = auth;
  return (
    <section className={`w-90 m-auto   ${styles.section}`}>
      <div className="coverHeader" />
      <h1 className={styles.title}>{translations?.profile?.displayName}</h1>
          <ProfileForm
            auth={auth}
            translations={translations}
            session={session}
          />
          <PasswordForm theme={theme} translations={translations} />
    </section>
  );
};

export default Page;
