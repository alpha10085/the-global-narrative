import style from "./sidebar.module.css";

import Link from "@/componentss/Shared/Link/Link";
import { useAuth } from "@/contexts/AuthProvider";
import { useClickOut } from "@/hooks/useClickout";
import LogoutIcon from '@mui/icons-material/Logout';
import WindowIcon from '@mui/icons-material/Window';
import PersonIcon from '@mui/icons-material/Person';
const Popup = ({ theme = {}, onClick, openPopup, setopenPopup }) => {
  const { session, logOut } = useAuth();
  const { ref } = useClickOut({
    onClickOutside: () => setopenPopup(false),
  });
  if (!openPopup) return;
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`${style.popupbottom}  ${theme?.backgroundd}    ${theme.bord20} flex column`}
    >
      <Link
        className={`${style.btnprofile}  flex just-sb al-i-c gap10  `}
        href={"/dashboard/profile"}
      >
        Profile
        <PersonIcon />
      </Link>
      <Link className={`${style.btnprofile}  flex just-sb al-i-c gap10  `} href={"/"}>
        Home
        <WindowIcon />
      </Link>
      <button
        onClick={logOut}
        className={`${style.btnprofile}   flex just-sb al-i-c gap10 w-100  ${theme.color} `}
      >
        log Out <LogoutIcon />
      </button>
    </div>
  );
};

export default Popup;
