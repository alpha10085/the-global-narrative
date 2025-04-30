import { cookies } from "next/headers";

import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import SetCookie from "@/_Backend/utils/SetCookie";

export const GET = AsyncHandler(
  async (req, res) => {
    const cookiesInstance = req.cookies;
    cookiesInstance.set("token", "", SetCookie({ maxAge: 0 }));
    return res({ message: "Logout success" }, 200);
  },
  {
    auth: true,
  }
);
