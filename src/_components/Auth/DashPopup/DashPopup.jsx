"use client";
import DashboardIcon from "@mui/icons-material/Dashboard";
import styles from "./DashPopup.module.css";
import Link from "@/_components/Shared/Link/Link";
import useTranslations from "@/hooks/useTranslations";
import { useAuth } from "@/contexts/AuthProvider";
import { isAdmin } from "@/config/auth";
const DashPopup = () => {
  const translations = useTranslations("Dashboard", ["todashboard"]);

  const { session } = useAuth();

  if (!isAdmin(session)) return null;
  return (
    <Link
      href={"/dashboard"}
      className={`${styles.container} flex-c t-up  clickable`}
    >
      <DashboardIcon />
      <h1>{translations?.todashboard}</h1>
    </Link>
  );
};

export default DashPopup;
