import { landingPageModel } from "@/_Backend/database/models/pages/landing.model";
import {
  LandingValCreate,
  LandingValUpdate,
} from "@/_Backend/modules/pages/landing.validation";

export const allModelsConfig = {
  // pages
  landing: {
    model: landingPageModel,
    validation: {
      create: LandingValCreate,
      update: LandingValUpdate,
    },
  },
  // components
};
