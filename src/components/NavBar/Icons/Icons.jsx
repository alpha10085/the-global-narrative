import { forwardRef } from "react";
import styles from "./Icons.module.css";
import BurgerIconMUi from "@mui/icons-material/Menu"; // Import BurgerIcon from MUI
import Link from "@/components/Shared/LocalizedLink/Link";
export const BurgerIcon = forwardRef(({ className,isOpen, onClick }, ref) => {
  return (
      <div ref={ref}  onClick={onClick} className={`${styles.burgerIcon} } ${isOpen && styles.active} flex column just-sb ${className} `}>
      <div className={styles.burgerIcon__line} />
      <div className={styles.burgerIcon__line} />
      {/* <div className={styles.burgerIcon__line} /> */}
    </div>
  );
});


export const ProfileIcon = ({ session }) => {
  const isAdmin = session?.role == "admin";
  return (
    <Link
      className={`${styles.ProfileIcon} ${session?.email && styles.activeProfileicon}`}
      href={
        session
          ? isAdmin
            ? `/dashboard`
            : `/profile`
          : "/log-in"
      }
    >
      <svg role="presentation" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3.99988 18C3.99988 15.7908 5.79074 14 7.99988 14H15.9999C18.209 14 19.9999 15.7908 19.9999 18V18C19.9999 19.1045 19.1044 20 17.9999 20H5.99988C4.89531 20 3.99988 19.1045 3.99988 18V18Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round"></path><circle cx="11.9999" cy="6.99997" r="3" stroke="black" strokeWidth="1.5"></circle></svg>
    </Link>
  )
}