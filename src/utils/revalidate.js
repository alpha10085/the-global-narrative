"use server";
import { revalidateTag } from "next/cache";
import { delay } from "./delay";
export const revalidateTags = async (tags = []) => {
  if (!tags) return;
  try {
    // Revalidate each tag with a slight delay to prevent rate-limiting issues
    for (const tag of tags?.filter(Boolean)) {
      revalidateTag(tag);
      if (!Array.isArray(tags)) tags = [tags];
    

      // Add a delay to avoid hitting revalidation limits
      await delay(100);
    }
  } catch (error) {
    // report error
    console.error("Error revalidating tags:", error);
  }
};
