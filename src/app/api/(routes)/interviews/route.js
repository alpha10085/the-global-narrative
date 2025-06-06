import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { interviewModel } from "@/_Backend/database/models/interviews.model";
import { InterviewValCreate } from "@/_Backend/modules/interview/interview.validation";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";

const config = {
  model: interviewModel,
  name: "interview",
  options: {
    searchFeilds: ["title", "category.title"],
  },
};
export const GET = FindAll({
  ...config,
  allowedTo: [...enumRoles.adminRoles, "public"],
});
export const POST = insertOne({
  schemaValidation: InterviewValCreate,
  allowedTo: enumRoles.adminRoles,
  ...config,
});
