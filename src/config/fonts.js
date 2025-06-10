import { Tajawal, Geist, Urbanist, Cormorant } from "next/font/google";

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

const CormorantFont = Cormorant({
  subsets: ["latin"],
  variable: "--font-Cormorant",
  weight: "400",
});

const allFonts = [geist, UrbanistFont, tajawal, CormorantFont];
export const fonts = {
  en: UrbanistFont,
  ar: tajawal,
  default: UrbanistFont,
  allFonts: `${allFonts?.map((val) => val?.variable).join(" ")}`,
};
