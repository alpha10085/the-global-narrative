"use client";
import { useEffect } from "react";
import style from "./wrapper.module.css";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthProvider";
import LoaderLayout from "../../LoaderLayout/LoaderLayout";

const Wrapper = ({ children ,  }) => {
  const { isLoading} = useAuth()
  const { theme = {}, toggleTheme } = useTheme();
  if (isLoading) return <LoaderLayout secondBackground  />
  return (
    <main className={`${style.main} ${theme?.bg200} ${theme.color}`}>
      {children}
    </main>
  );
};

export default Wrapper;
