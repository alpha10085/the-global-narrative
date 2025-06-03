import { headers } from "next/headers";
export const isUnderTest = async () => {
  try {
    const headersList = await headers();
    const text = headersList.get("user-agent");
    return text?.includes("Lighthouse");
  } catch (error) {
    return false;
  }
};
