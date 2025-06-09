import { Tajawal, Geist, Urbanist } from "next/font/google";
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

export const fonts = {
  en: UrbanistFont,
  ar: tajawal,
  default: UrbanistFont,
};

