"use client";
import { createContext, useContext, useState, useEffect } from "react";
import themes from "../services/themes/themes";
import CookiesClient from "js-cookie";

const ThemeContext = createContext();

const ThemeCTX = ({ children, initValue = "light" }) => {
  const [theme, setTheme] = useState(initValue);

  useEffect(() => {
    // دي هتشتغل بس على العميل
    const savedTheme =
      CookiesClient.get("theme") ||
      (typeof window !== "undefined" && localStorage.getItem("theme")) ||
      initValue;

    setTheme(savedTheme);
  }, [initValue]);

  const { light, dark } = themes;

  const toggleTheme = () => {
    const selectedTheme = theme === "light" ? "dark" : "light";
    setTheme(selectedTheme);
    CookiesClient.set("theme", selectedTheme, { expires: 730 });
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", selectedTheme);
    }
  };

  const currentTheme = theme === "light" ? light : dark;

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

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeCTX");
  }
  return context;
};

export default ThemeCTX;
