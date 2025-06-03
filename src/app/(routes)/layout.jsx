import React from "react";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import DashPopup from "@/components/Auth/DashPopup/DashPopup";
import SmoothScroll from "@/components/Shared/SmoothScroll/SmoothScroll";
import DynamicCursor from "@/components/DynamicCursor/DynamicCursor";
import "lenis/dist/lenis.css";
export default async function RootLayout({ children }) {
  return (
    <main
      style={{
        fontFamily: "var(--font-inter)",
        background:"black",
        minHeight:"100vh"
      }}
      className="ShowSmoothEffectShortDelay"
    >
      {/* <SmoothScroll duration={1} />
      <NavBar />
      <DynamicCursor />
      <div style={{ minHeight: "100vh" }}>{children}</div>
      <Toaster />
      <DashPopup />
      <Footer /> */}
    </main>
  );
}
