
import { cloudinary } from "@/_Backend/utils/cloudinary";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";

export const POST = AsyncHandler(async (req, res) => {
  const timestamp = Math?.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    cloudinary.config().api_secret
  ); 
  // Return the created ticket
  return res(
    {
      signature,
      api_key: cloudinary.config().api_key,
      cloud_name: cloudinary.config().cloud_name,
      timestamp,
    },
    201
  );
},{
    allowedTo: [...enumRoles.adminRoles]
});
