import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { headers } from "next/headers";
import { updateLanguageConfig } from "./(constant)/tools/localization/helpers";

export const GET = AsyncHandler(
  async (req, res, next) => {
    await updateLanguageConfig({
      locale: { key: "es", label: "Español" },
      remove:true,
    });
    return res({
      message: "live",
    });
  },
  {
    decodeUserAgent: true,
  }
);
