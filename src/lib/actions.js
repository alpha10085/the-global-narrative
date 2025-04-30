"use server";
import { AuthRoutes } from "@/config/routes";
import { isIncludes } from "@/utils/isIncludes";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ValidateLocale } from "@/i18n/request";
import translation from "@/i18n/config";
// Method to revalidate the cache for a specific path
export const revalidateHomePage = async (path) => {
  revalidatePath("/"); // Revalidate the cache for the homepage "/"
};

export const redirectAfterSign = async (isAdmin) => {
  // get cookies
  const getcookies = await cookies();
  // get next route if user try to access auth route
  let route = getcookies.get("next")?.value;
  let locale = translation?.route
    ? `/${ValidateLocale(getcookies.get("locale")?.value, true)}`
    : "";
  // check if user is admin and try to access admin route
  route = isAdmin
    ? "/dashboard"
    : isIncludes(route, AuthRoutes)
    ? route
    : "/profile";
  // delete next from cookies
  getcookies.delete("next");
  

  // redirect to new route
  redirect(`${locale}${route}`, RedirectType.replace);
};

export const deleteItemfromCookies = async (key) => {
  // get cookies
  const getcookies = await cookies();
  getcookies.delete(key);
};
export const SessionExpire = async () => {
  // get cookies
  const getcookies = await cookies();
  const locale = getcookies.get("locale")?.value;
  getcookies.set({
    name: "token",
    value: "",
    expires: new Date(0), // set to 1970-01-01T00:00:00Z
    domain: process.env.DOMAIN,
    sameSite: "Strict",
  });
  redirect(`${locale}/log-in`, RedirectType.replace);
};
