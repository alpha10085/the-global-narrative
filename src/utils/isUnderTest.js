import { headers } from "next/headers";
export const isUnderTest = async () => {
  return true
  try {
    const headersList = await headers();
    const text = headersList.get("user-agent");
    return text?.includes("Lighthouse");
  } catch (error) {
    return false;
  }
};
