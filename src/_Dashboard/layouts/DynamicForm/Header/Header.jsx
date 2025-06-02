import Link from "@/components/Shared/LocalizedLink/Link";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";
function removeLastSegment(path) {
  const segments = path.split("/");
  const lastSegment = segments[segments.length - 1];
  segments.pop(); // Remove the last segment
  if (segments[segments.length - 1] === "pages") {
    return [path, null];
  }
  return [segments.join("/"), lastSegment];
}
const Header = ({ translations, modeState, type, displayName }) => {
  const location = usePathname();
  const [pathname, lastElemnt] = removeLastSegment(location);

  return (
    <div className={` ml-5  flex al-i-c  gap10 ${styles.head}`}>
      <Link href={`${pathname}`} className=" t-up ">
        <h1 className={styles.title}>
          {translations?.displaynames?.[displayName]}
        </h1>
      </Link>
      {
        <>
          <h1 className={`${styles.midline} `}>/</h1>
          <h1 className={`${styles.titleId} `}>{translations?.[modeState]}</h1>
        </>
      }
    </div>
  );
};

export default Header;
