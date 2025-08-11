"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import themes from "../services/themes/themes";
import CookiesClient from "js-cookie";

const ThemeContext = createContext();

const ThemeCTX = ({ children, initValue = "light" }) => {
  const [theme, setTheme] = useState(initValue);
  const styleTagRef = useRef(null);

  useEffect(() => {
    // This will run only on the client
    const savedTheme =
      CookiesClient.get("theme") ||
      (typeof window !== "undefined" && localStorage.getItem("theme")) ||
      initValue;

    setTheme(savedTheme);
  }, [initValue]);

  const { light, dark } = themes;

  const toggleTheme = () => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `* { transition: none !important; }`;
    document.head.appendChild(styleTag);
    styleTagRef.current = styleTag;

    const selectedTheme = theme === "light" ? "dark" : "light";
    setTheme(selectedTheme);
    CookiesClient.set("theme", selectedTheme, { expires: 730 });

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", selectedTheme);
    }

    setTimeout(() => {
      styleTag.remove();
      styleTagRef.current = null;
    }, 500);
  };

  const currentTheme = theme === "light" ? light : dark;

  useEffect(() => {
    const handleStorageChange = ({ key, newValue }) => {
      if (key === "theme" && newValue) {
        setTheme(newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
