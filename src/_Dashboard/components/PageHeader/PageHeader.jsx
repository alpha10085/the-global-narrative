'use client'

import { usePathname } from 'next/navigation';
import styles from "./PageHeader.module.css"

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@/_Dashboard/context/ThemeCTX"
import Link from '@/_components/Shared/Link/Link';
const PageHeader = ({ slug = "", displayName = "" }) => {
    const { theme } = useTheme()
    // Get the pathname and remove "/dashboard/"
    let location = usePathname()?.replace("/dashboard", "") || "";
    // Replace the slug with displayName if conditions are met
    if (location.includes("collections") && slug) {
        location = location.replace(slug, displayName);
    }
    const segments = location.split("/").filter(Boolean);
    // Split the location into segments and filter out empty ones

    return (
        <ul className={`${styles.container} flex gap5 al-i-c  `}>
            {segments?.map((segment, index) => {
                // Create a subpath for the breadcrumb link
                const subPath = ["collections", "pages"].includes(segment)
                    ? `${segment}/${segments[index + 1]}`
                    : segments.slice(0, index + 1).join("/");

                return (
                    <li
                        className={`${styles.breadcrumb}  showSmooth  ${index + 1 === segments?.length && styles.active} flex al-i-c  gap5`}
                        key={index}>
                        <ArrowForwardIosIcon />
                        <Link
                            className={`${theme.btn20} ${index + 1 === segments?.length && "active"}`}
                            href={`/dashboard/${subPath}`}>

                            {segment}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default PageHeader;
