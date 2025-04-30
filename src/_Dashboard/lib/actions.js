"use server";
import { delay } from "@/utils/time";
import { revalidateTag } from "next/cache";

export const revalidateTagAfterAction = async (tags = []) => {
  if (!tags) return;
  if (!Array.isArray(tags)) tags = [tags];
  try {
    // Revalidate each tag with a slight delay to prevent rate-limiting issues
    for (const tag of tags?.filter(Boolean)) {
      revalidateTag(tag);
      // Add a delay to avoid hitting revalidation limits
      await delay(100);
    }
  } catch (error) {
    console.error("Error revalidating tags:", error);
  }
};
