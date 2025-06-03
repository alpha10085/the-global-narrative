"use client";
import Link from "@/Components/Shared/Link/Link";
import style from "./sidebar.module.css";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import AppsIcon from "@mui/icons-material/Apps";
import LayersIcon from "@mui/icons-material/Layers";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Img from "@/Components/Shared/img/Img";
import { useAuth } from "@/contexts/AuthProvider";
import Popup from "./popup";
import { useClickOut } from "@/hooks/useClickout";
import useRoles from "@/_Dashboard/hooks/auth/useRoles";
import useTranslationsDashboard from "@/_Dashboard/hooks/useTranslationsDashboard";
import Loader from "./Loader/Loader";
import RouteList from "./RoutesList/RouteList";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { usePathname } from "@/hooks/useTranslations";
function extractLastPathSegment(url = "") {
  // Split the URL into parts by "/"
  return url.replace("/dashboard", "")?.split("/").filter(Boolean);
}

const Sidebar = () => {
  const { session } = useAuth();
  const { theme = {} } = useTheme();
  const pathname = usePathname();
  const linkPathName = extractLastPathSegment(pathname);
  const {
    collections,
    pages,
    isLoading,
    private: staticPages,
    components,
  } = useRoles();
  const [open, setOpen] = useState(false);
  const [openPopup, setopenPopup] = useState(false);
  const handleclose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const { ref } = useClickOut({ onClickOutside: handleclose });

  const translations = useTranslationsDashboard(
    [],
    [
      "Sidebar.collections",
      "Sidebar.components",
      "Sidebar.pages",
      "Sidebar.media",
      "Sidebar.settings",
      "Sidebar.workspace",
      ...[...collections, ...pages, ...components].map(
        (val) => `displaynames.${val?.displayName}`
      ),
    ]
  );

  return (
    <section
      className={`${style.slider}    ${open && style.silderbarOpen} ${
        theme.background
      }  ${theme?.color} `}
    >
      <div
        ref={ref}
        rtl={false ? "true" : undefined}
        className={`${style.wrapper} ${theme.scrollBar}  ${theme?.background}`}
      >
        <Link href={"/dashboard"}>
          <div className={`${style.head} flex column  just-c al-i-c al-c-c `}>
            <div className={style.logo}>
              <Img
                url={`/dashboard/logo-${theme.name}.png`}
                theme={theme?.name}
                disableSkeleton
                className={style.logoimg}
              />
            </div>
            <p>{translations?.Sidebar?.workspace}</p>
          </div>
        </Link>
        <div
          className={`flex column just-sb ${theme.scrollBar} ${style.wrapperforuls}`}
        >
          {isLoading ? (
            <Loader active={open} theme={theme} />
          ) : (
            <>
              <div
                onClick={handleToggle}
                className={` ${theme.scrollBar} showSmooth ${style.wrapperul}`}
              >
                <RouteList
                  linkPathName={linkPathName}
                  routeKey={"collections"}
                  options={collections}
                  Icon={AppsIcon}
                  theme={theme}
                  translations={translations}
                  active={open}
                />
                <RouteList
                  linkPathName={linkPathName}
                  routeKey={"pages"}
                  options={pages}
                  Icon={LayersIcon}
                  theme={theme}
                  translations={translations}
                  active={open}
                />
                <RouteList
                  linkPathName={linkPathName}
                  routeKey={"components"}
                  options={components}
                  Icon={BubbleChartIcon}
                  theme={theme}
                  translations={translations}
                  active={open}
                />

                {staticPages.find((p) => p.key === "media") && (
                  <div
                    className={`${style.title} ${
                      pathname?.includes("media") && `${style?.active} `
                    }  ${style.customtitle} ${style.cutomSvg} flex al-i-c gap5`}
                  >
                    <PermMediaIcon />
                    <Link
                      className={`${style.linkeffect}`}
                      href={"/dashboard/media"}
                    >
                      {translations?.Sidebar?.media}
                    </Link>
                  </div>
                )}
                <div
                  className={`${style.title}  ${
                    pathname?.includes("settings") && `${style?.active} `
                  } flex al-i-c gap5`}
                >
                  <SettingsIcon />
                  <Link
                    className={`${style.linkeffect}`}
                    href={"/dashboard/settings"}
                  >
                    {translations?.Sidebar?.settings}
                  </Link>
                </div>
              </div>

              <div
                onClick={() => {
                  setOpen(true);
                  setopenPopup(true);
                }}
                className={`${style.bottombox} showSmooth `}
              >
                <div className={`${style.bottomwrapper} gap5 flex al-i-c  `}>
                  <div className={`${style.profPic} flex-c`}>
                    <p>{session?.fullName?.slice(0, 2)}</p>
                  </div>
                  <p className={style.username}>{session?.fullName}</p>
                </div>
              </div>
            </>
          )}
        </div>

        <Popup
          openPopup={openPopup}
          onClick={() => {
            setOpen(false);
            setopenPopup(false);
          }}
          setopenPopup={setopenPopup}
          theme={theme}
        />
        <div
          onClick={() => setOpen(!open)}
          className={`${style.toggleBtn} ${theme.button}`}
        >
          <ArrowForwardIosIcon />
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
