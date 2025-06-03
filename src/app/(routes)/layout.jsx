import React from "react";
import Footer from "@/Components/Footer/Footer";
import NavBar from "@/Components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import DashPopup from "@/Components/Auth/DashPopup/DashPopup";
import SmoothScroll from "@/Components/Shared/SmoothScroll/SmoothScroll";
import DynamicCursor from "@/Components/Shared/DynamicCursor/DynamicCursor";
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
