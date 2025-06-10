import Footer from "@/componentss/Footer/Footer";
import NavBar from "@/componentss/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import DashPopup from "@/componentss/Auth/DashPopup/DashPopup";
import SmoothScroll from "@/componentss/Shared/SmoothScroll/SmoothScroll";
import DynamicCursor from "@/componentss/Shared/DynamicCursor/DynamicCursor";
import PageAnalyticsTracker from "@/lib/PageAnalyticsTracker";
import Intro from "@/componentss/Intro/Intro";

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
