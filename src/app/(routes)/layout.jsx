import React from "react";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import DashPopup from "@/components/Auth/DashPopup/DashPopup";

export default async function RootLayout({ children }) {
  return (
    <main
      style={{
        fontFamily: "var(--font-inter)",
      }}
      className="ShowSmoothEffectShortDelay"
    >
      <NavBar />
      <div style={{ minHeight: "80vh" }}>{children}</div>
      <Toaster />
      <DashPopup />
      <Footer />
    </main>
  );
}
