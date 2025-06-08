import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { deleteOne, FindOne, updateOne } from "@/_Backend/utils/handlers";
import { interviewModel } from "@/_Backend/database/models/interviews.model";
import { InterviewValUpdate } from "@/_Backend/modules/interview/interview.validation";

const config = {
  model: interviewModel,
  name: "interview",
  alloweTo: [enumRoles.adminRoles],
  schemaValidation: InterviewValUpdate,
};
export const GET = FindOne(config);
export const PUT = updateOne(config);
export const DELETE = deleteOne(config);
