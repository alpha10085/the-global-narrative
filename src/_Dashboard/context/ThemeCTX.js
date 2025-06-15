"use client";
import { createContext, useContext, useState, useEffect } from "react";
import themes from "../services/themes/themes";
import CookiesClient from "js-cookie";

const ThemeContext = createContext();

/**
 * Theme Context provider component that manages and provides theme-related values
 * to the rest of the application.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {"light" | "dark"} [props.initValue="light"]
 */
const ThemeCTX = ({ children, initValue = "light" }) => {
  const [theme, setTheme] = useState(() => {
    return (
      CookiesClient.get("theme") || localStorage.getItem("theme") || initValue
    );
  });

  const { light, dark } = themes;

  const toggleTheme = () => {
    const selectedTheme = theme === "light" ? "dark" : "light";
    setTheme(selectedTheme);
    CookiesClient.set("theme", selectedTheme, { expires: 730 });
    localStorage.setItem("theme", selectedTheme);
  };

  const currentTheme = theme === "light" ? light : dark;

  // Sync theme across tabs
  useEffect(() => {
    const handleStorageChange = ({ key, newValue }) => {
      if (key === "theme" && newValue) {
        setTheme(newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const ctxProps = {
    theme: currentTheme,
    next: theme === "light" ? dark : light,
    toggleTheme,
  };

  return (
    <main
      className={`${currentTheme.background} flex`}
      style={{ fontFamily: "var(--font-geist)" }}
    >
      <ThemeContext.Provider value={ctxProps}>{children}</ThemeContext.Provider>
    </main>
  );
};

/**
 * Custom hook to access the theme context values.
 * @returns {{ theme: typeof themes.light | typeof themes.dark, next: typeof themes.light | typeof themes.dark, toggleTheme: () => void }}
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeCTX");
  }
  return context;
};

export default ThemeCTX;
