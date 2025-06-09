import { cookies } from "next/headers";
import ReactQuery from "@/contexts/reactQuery";
import { Tajawal, Geist, Urbanist } from "next/font/google";
import "../styles/main.css";
import "../styles/framework.css";
import "../styles/swiper.css";
import "../styles/animation.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "lenis/dist/lenis.css";
import { AuthProvider } from "@/contexts/AuthProvider";
// import DevToolsWrapper from "@/_DevTools/DevToolsWrapper";
import { getLocale } from "next-intl/server";
import interceptor from "@/utils/consoleProxy";
import { isProductionMode } from "@/config/main";
import { ValidateLocale } from "@/i18n/request";
import { ErrorBoundary } from "@/contexts/ErrorBoundryCTX/ErrorBoundryCTX";
import { NextIntlClientProvider } from "next-intl";
// If loading a variable font, you don't need to specify the font weight
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});
const UrbanistFont = Urbanist({
  subsets: ["latin"],
  variable: "--font-Urbanist",
});
const tajawal = Tajawal({
  subsets: ["latin"],
  variable: "--font-tajawal",
  weight: "400",
});
export const metadata = {
  title: process.env.NEXT_PUBLIC_project_name,
  description: "Welcome",
  other: {
    "color-scheme": "light dark",
    "supported-color-schemes": "light",
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
const fonts = {
  en: UrbanistFont,
  ar: tajawal,
};
export default async function RootLayout({ children }) {
  if (!isProductionMode) {
    interceptor.intercept(); // only in server-side
  }
  const cookieStore = await cookies();
  const locale = await getLocale();
  const messages = (
    await import(`../i18n/locales/${ValidateLocale(locale, true)}.json`)
  ).default;
  const boundary = cookieStore?.get("boundary")?.value;
  const selectedFont = fonts[locale] || fonts.en;
  return (
    <ReactQuery>
      <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
        <body className={`${selectedFont.variable}  ${selectedFont.className}`}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* <DevToolsWrapper> */}
            <ErrorBoundary boundary={boundary}>
              <AuthProvider locale={locale}>{children}</AuthProvider>
            </ErrorBoundary>
            {/* </DevToolsWrapper> */}
          </NextIntlClientProvider>
        </body>
      </html>
    </ReactQuery>
  );
}
