"use client";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import styles from "./settings.module.css";
import DropDown from "../Dropdown/Dropdown";
import ThemeButton from "./Buttons/ThemeButton/ThemeButton";
import useLocaleSwitcher from "@/hooks/uselocalSwitcher";
import AccountsLink from "./AccountsLink/AccountsLink";
const Settings = ({ translations = {} }) => {
  const { theme } = useTheme();
  const { changeLocale, locale, options } = useLocaleSwitcher();
  return (
    <section className={`${styles.section}  showSmooth  flex gap50`}>
      <div className={`${styles.layout} ${theme.background} ${theme.bord20} `}>
        <div className="flex just-sb wrap">
          <div className={`flex column gap10 ${styles.labelDropDwon}`}>
            <h1 className={styles.localsTitle}>{translations?.language}</h1>
            <DropDown
              callBack={changeLocale}
              currentValue={locale?.label}
              theme={theme}
              options={options}
            />
          </div>
          <ThemeButton
            className={styles.labeltheme}
            translations={translations}
            />
        </div>
        <AccountsLink 
            theme={theme}
        
        translations={translations}  />

      </div>
      {/* <WarningForm theme={theme} /> */}
    </section>
  );
};

export default Settings;
