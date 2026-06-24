import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { imageLookup } from "@/_Backend/commons/lookup";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { customQuery } from "./services";
import { videoReelsModel } from "@/_Backend/database/models/videoReels.model";
import { 
  videoReelsValidationCreate,
  videoReelsValidationUpdate,
  videoReelsValidationRelation,
 } from "@/_Backend/modules/videoReels/videoReels.validation";

const config = {
  model: videoReelsModel,
  name: "videoReels",
  options: {
    searchFeilds: ["title", "content", "date"],
  },
  customQuery,
  cache: {
    group: true,
    stdTTL: "1y",
  },
};


export const GET = FindAll({
  ...config,
  allowedTo: [...enumRoles.adminRoles, "public"],
  pushToPipeLine: [...imageLookup("video"), ...imageLookup("thumbnail")],
  publishMode: true,
  queryMiddleware: (query, user) => {
    return {
      sort: "date:desc",
    };
  },
});
export const POST = insertOne({
  schemaValidation: videoReelsValidationCreate,
  allowedTo: enumRoles.adminRoles,
  ...config,
  slug: "title",
});
