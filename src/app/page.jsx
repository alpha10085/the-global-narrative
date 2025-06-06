import { redirect } from "next/navigation";
import config from "@/i18n/config";
export default function RootPage() {
  redirect(`/${config.defaultLocale}`);
}