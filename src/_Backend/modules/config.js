import { landingPageModel } from "@/_Backend/database/models/pages/landing.model";
import { aboutUsPageModel } from "../database/models/pages/about.model";
import { customerPageModel } from "../database/models/pages/customer.model";
import { popupFromComponentModel } from "../database/models/components/popupFrom.model";
import { contactUsPageModel } from "../database/models/pages/contactUs.model";
import { LandingValCreate, LandingValUpdate } from "./pages/landing.validation";
import { aboutUsValCreate, aboutUsValUpdate } from "./pages/about.validation";
import {
  contactUsValCreate,
  contactUsValUpdate,
} from "./pages/contactUs.validation";
import {
  customerValCreate,
  customerValUpdate,
} from "./pages/customer.validation";
import {
  productsValCreate,
  productsValUpdate,
} from "./pages/products.validation";
import {
  popupFromValCreate,
  popupFromValUpdate,
} from "./components/popupFrom/popupFrom.validation";
import { productsPageModel } from "../database/models/pages/products.model";
import { footerComponentModel } from "../database/models/components/footer.model";
import { footerValCreate, footerValUpdate } from "./components/footer/footer.validation";

export const allModelsConfig = {
  // pages
  landing: {
    model: landingPageModel,
    validation: {
      create: LandingValCreate,
      update: LandingValUpdate,
    },
  },
  "about-us": {
    model: aboutUsPageModel,
    validation: {
      create: aboutUsValCreate,
      update: aboutUsValUpdate,
    },
  },
  "contact-us": {
    model: contactUsPageModel,
    validation: {
      create: contactUsValCreate,
      update: contactUsValUpdate,
    },
  },
  customer: {
    model: customerPageModel,
    validation: {
      create: customerValCreate,
      update: customerValUpdate,
    },
  },
  product: {
    model: productsPageModel,
    validation: {
      create: productsValCreate,
      update: productsValUpdate,
    },
  },
  // components
  "popup-form": {
    model: popupFromComponentModel,
    validation: {
      create: popupFromValCreate,
      update: popupFromValUpdate,
    },
  },
    "footer": {
    model: footerComponentModel,
    validation: {
      create: footerValCreate,
      update: footerValUpdate,
    },
  },
};
