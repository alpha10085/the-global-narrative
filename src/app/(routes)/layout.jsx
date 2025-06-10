import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import DashPopup from "@/components/Auth/DashPopup/DashPopup";
import SmoothScroll from "@/components/Shared/SmoothScroll/SmoothScroll";
import DynamicCursor from "@/components/Shared/DynamicCursor/DynamicCursor";
import PageAnalyticsTracker from "@/lib/PageAnalyticsTracker";
import Intro from "@/components/Intro/Intro";

export default async function RootLayout({ children }) {
  return (
    <main  style={{ fontFamily: "var(--font-inter)" }}
      className="ShowSmoothEffectShortDelay"
    >
      <SmoothScroll duration={1} />
      <Intro />
      <NavBar />
      <DynamicCursor />
      <div style={{ minHeight: "100vh" }}>{children}</div>
      <Toaster />
      <DashPopup />
      <Footer />
      <PageAnalyticsTracker />
    </main>
  );
}
