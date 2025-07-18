import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import DashPopup from "@/components/Auth/DashPopup/DashPopup";
import SmoothScroll from "@/components/Shared/SmoothScroll/SmoothScroll";
import PageAnalytics from "@/components/Shared/PageAnalytics/PageAnalytics";
import SSRFetcher from "@/components/Shared/SSRFetcher/SSRFetcher";
import Fallback from "@/components/Footer/Fallback";
import FloatedSection from "@/components/Shared/FloatedSection/FloatedSection";
import styles from "./page.module.css";
import ClientWrapper from "@/components/ClientWrapper/ClientWrapper";
export default async function RootLayout({ children }) {
  return (
    <main
      style={{ fontFamily: "var(--font-inter)" }}
      className={`ShowSmoothEffectShortDelay ${styles.mainlayout}`}
    >
      <SmoothScroll duration={1} />

      <NavBar />
      <div style={{ minHeight: "100vh" }}>{children}</div>
      <SSRFetcher
        Component={Footer}
        path="/components/footer"
        Fallback={Fallback}
        props={{ revalidate: "1y" }}
      />

      <Toaster />
      <DashPopup />

      <PageAnalytics />
    </main>
  );
}
