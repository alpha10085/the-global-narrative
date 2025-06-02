import mongoose from "mongoose";
import UserModel from "@/_Backend/database/models/user.model";
import { validation } from "@/_Backend/middlewares/globels/validation";
import { AsyncHandler } from "@/_Backend/middlewares/globels/AsyncHandler";
import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { FindAll } from "@/_Backend/utils/handlers";
import { removeSpecificText } from "@/_Backend/utils/handletypes";
import { insertUserVal } from "@/_Backend/modules/_constant/user/user.validation";
import httpStatus from "@/_Backend/assets/messages/httpStatus";

export const GET = FindAll({
  model: UserModel,
  allowedTo: [enumRoles.admin],
  queryMiddleware: (query) => {
    if (!query?.filters?.role) {
      query.filters = {
        ...query?.filters,
        role: { $ne: enumRoles.admin },
      };
    }
    let fields = removeSpecificText(query?.fields, ["password", "-password"]);
    query.fields = `${fields ? `${fields},` : ""}-password`;

    return query;
  },
  piplineMiddleware: (pipeline, req, user) => {
    let $match = {
      _id: { $ne: new mongoose.Types.ObjectId(user?._id) },
    };
    pipeline.push({ $match });
    return pipeline;
  },
  cache: {
    stdTTL: "1y",
    allowedTo: [enumRoles.admin],
  },
});
export const POST = AsyncHandler(
  async (req, res, next) => {
    const { email } = req?.body;
    // Validate user data using the imported schema
    validation(insertUserVal)(req?.body, req?.params);
    // Verify token and get user
    const user = req.user;
    // check if iS exist
    const checkIfIsExist = await UserModel.findOne({ email });
    if (checkIfIsExist)
      next({
        ...httpStatus.conflict,
        key: "email",
      });
    req.body.createdBy = user?._id;
    // Create new user object
    const newUser = new UserModel(req?.body);
    // Save user to database
    await newUser.save();
    return res(
      {
        message: "sucess",
        data: {
          _id: newUser?._id,
          fullName: newUser?.fullName,
          email: newUser?.email,
          role: newUser?.role,
          isActive: newUser?.isActive,
          isblocked: newUser?.isblocked,
          createdAt: newUser?.createdAt,
          updatedAt: newUser?.updatedAt,
          createdBy: {
            _id: user?._id,
            fullName: user.fullName,
          },
        },
      },
      200
    );
  },
  {
    allowedTo: [enumRoles.admin],
  }
);
