import { Tajawal, Geist, Ubuntu, Cormorant } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight:"400"
});
const UbuntuFont = Ubuntu({
  subsets: ["latin"],
  variable: "--font-Ubuntu",
  weight:"400"
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

const allFonts = [geist, UbuntuFont, tajawal, CormorantFont];
export const fonts = {
  en: UbuntuFont,
  ar: tajawal,
  default: UbuntuFont,
  allFonts: `${allFonts?.map((val) => val?.variable).join(" ")}`,
};
