import Spinner from "@/components/Shared/Spinner/Spinner";
import styles from "./LogOutCover.module.css";
import { useEffect } from "react";
import { extractPath } from "@/utils/data";
import { usePathname } from "@/hooks/useTranslations";

const LogOutCover = ({ OnFinish }) => {
  const {pathName} = usePathname();
  useEffect(() => {
    if (["/", "/log-in"].includes(pathName)) OnFinish();
  }, [pathName]);
  return (
    <div
      className={`${styles.layout}   h-100 flex-c  showSmooth column coverredirct`}
    >
      <Spinner size={40} color="black" />
      <h1 className={styles.text}>logging out...</h1>
    </div>
  );
};

export default LogOutCover;
