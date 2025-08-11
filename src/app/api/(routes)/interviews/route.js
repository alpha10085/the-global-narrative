import { enumRoles } from "@/_Backend/assets/enums/Roles_permissions";
import { interviewModel } from "@/_Backend/database/models/interviews.model";
import { InterviewValCreate } from "@/_Backend/modules/interview/interview.validation";
import { FindAll, insertOne } from "@/_Backend/utils/handlers";
import { customQuery } from "./services";
const config = {
  model: interviewModel,
  name: "interview",
  options: {
    searchFeilds: ["title", "category.title"],
  },
  
  customQuery,
};
export const GET = FindAll({
  ...config,
  allowedTo: [...enumRoles.adminRoles, "public"],
  publishMode:true,
    queryMiddleware:(query,user) => {
    return {
      sort:"date:desc"
    }
  } 
});
export const POST = insertOne({
  schemaValidation: InterviewValCreate,
  allowedTo: enumRoles.adminRoles,
  ...config,
});
