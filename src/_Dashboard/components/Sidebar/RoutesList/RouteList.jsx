import Link from "@/components/Shared/Link/Link";
import styles from "./RouteList.module.css";
import { customText } from "@/utils/text";

const RouteList = ({
  translations = {},
  linkPathName,
  routeKey = "",
  options = [],
  Icon = () => <></>,
  theme,
  titleClassName = "",
  active = false,
}) => {
  const isActive = linkPathName?.[0] === routeKey;
  if (!options?.length) return null;

  const handleFormateLable = (val) => {
    const label = translations?.displaynames?.[val];

    return customText(label, 18, "..");
  };
  return (
    <div>
      <div
        className={`${styles.title} 
        ${isActive && `${styles?.active} `}   
        ${active && styles.activeSidebar}
        flex al-i-c gap5`}
      >
        <Icon />
        <h1 className={`${styles.linkeffect} ${titleClassName}`}>
          {translations?.Sidebar?.[routeKey]}
        </h1>
      </div>
      <ul
        dark={theme.name === "dark" ? "true" : undefined}
        className={`${theme.scrollBar} ${styles.ul}`}
      >
        {options?.map((val, ind) => (
          <li key={ind} className={styles.li}>
            <Link
              className={`${theme?.btn20}  ${
                isActive && linkPathName?.[1] === val?.key && "active"
              } flex gap10  ${styles.link}`}
              href={`/dashboard/${routeKey}/${val?.key}`}
            >
              {handleFormateLable(val?.displayName)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteList;
