export const isProductionMode =
  process.env.NEXT_PUBLIC_MODE === "pro" &&
  !process.env.NEXT_PUBLIC_client.includes("127.0.0.1");

