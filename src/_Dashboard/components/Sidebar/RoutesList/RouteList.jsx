import Link from "@/_components/Shared/Link/Link";
import styles from "./RouteList.module.css";

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
  return (
    <>
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
              {translations?.displaynames?.[val?.displayName]}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RouteList;
