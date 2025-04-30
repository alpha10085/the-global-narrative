import Link from "@/components/Shared/LocalizedLink/Link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import styles from "./AccountsLink.module.css";
import useSchema from "@/_Dashboard/hooks/auth/useSchema";

const AccountsLink = ({ translations = {}, theme = {} }) => {
  const { schema=null } = useSchema("admins")
  if (!schema) return;
  return (
    <Link
      href={"/dashboard/settings/admins"}
      className={`flex  al-i-c just-sb mb-0 mt-20 ${styles.btnsadmin}  ${theme.button}`}
    >
      <h1 className={`${styles.adminTiTle} `}>{translations?.accounts}</h1>
      <span className={`flex-c gap5 ${styles.btnadmin} `}>
        {translations?.manage}
        <ArrowOutwardIcon className="svg-dir" />
      </span>
    </Link>
  );
};

export default AccountsLink;
