import { clientModel } from "@/_Backend/database/models/clients.model";
import { clientsPageModel } from "@/_Backend/database/models/pages/clientsPage.model";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { AppError } from "@/_Backend/utils/AppError";

export const GET = AsyncHandler(
  async (req, res) => {
    const document = await clientsPageModel.findOne().lean();
    if (!document) {
      throw new AppError({
        message: `Page is not found`,
        code: 404,
      });
    }

    const clients = await clientModel
      .find({
        publish: true,
      })
      .lean();
      

    return res(
      {
        ...document,
        clients,
      },
      200
    );
  },
  {
    cache: {
   stdTTL:"0s"
    },
  }
);
