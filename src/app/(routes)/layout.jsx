import React from "react";
import Footer from "@/_components/Footer/Footer";
import NavBar from "@/_components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import DashPopup from "@/_components/Auth/DashPopup/DashPopup";
import SmoothScroll from "@/_components/Shared/SmoothScroll/SmoothScroll";
import DynamicCursor from "@/_components/Shared/DynamicCursor/DynamicCursor";
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
