import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { deleteOne, FindOne, updateOne } from "@/_Backend/utils/handlers";
import { videoReelsModel } from "@/_Backend/database/models/videoReels.model";

import { 
  videoReelsValidationCreate,
  videoReelsValidationUpdate,
  videoReelsValidationRelation,
 } from "@/_Backend/modules/videoReels/videoReels.validation";

const config = {
  model: videoReelsModel,
  name: "video Reel",
  alloweTo: [enumRoles.adminRoles],
  schemaValidation: videoReelsValidationUpdate,
};
export const GET = FindOne(config);
export const PUT = updateOne(config);
export const DELETE = deleteOne(config);
