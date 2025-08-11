import { getPage } from "@/lib/pages";

export function warmPagesInBackground() {
  const slugs = ["landing", "about-us", "services-page", "custom-news" , "interviews-page" , "contact-us" , "clients-logos"];
  slugs.forEach((slug) => {
    // Trigger fetch without await
    getPage(slug).catch((err) => {
      console.error(`Cache warm failed for ${slug}:`, err);
    });
  });
}