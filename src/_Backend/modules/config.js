import { footerComponentModel } from "../database/models/components/footer.model";
import { aboutUsPageModel } from "../database/models/pages/about.model";
import { clientsPageModel } from "../database/models/pages/clientsPage.model";
import { contactUsPageModel } from "../database/models/pages/contactUs.model";
import { interviewsModel } from "../database/models/pages/interviews.model";
import { landingModel } from "../database/models/pages/landing.model";
import { newsPageModel } from "../database/models/pages/newsPage.model";
import { servicesPageModel } from "../database/models/pages/services.model";
import {
  footerValCreate,
  footerValUpdate,
} from "./components/footer/footer.validation";
import { AboutValCreate, AboutValUpdate } from "./pages/about.validation";
import {
  clientsPageValCreate,
  clientsPageValUpdate,
} from "./pages/clients.validation";
import {
  ContactPageValCreate,
  ContactPageValUpdate,
} from "./pages/contactUs.validation";
import {
  interviewsValCreate,
  interviewsValUpdate,
} from "./pages/interviews.validation";
import { LandingValCreate, LandingValUpdate } from "./pages/landing.validation";
import {
  NewsPageValCreate,
  NewsPageValUpdate,
} from "./pages/newsPage.validation";
import {
  ServicesPageValCreate,
  ServicesPageValUpdate,
} from "./pages/services.validation";

export const allModelsConfig = {
  // pages
  landing: {
    model: landingModel,
    validation: {
      create: LandingValCreate,
      update: LandingValUpdate,
    },
  },
  "about-us": {
    model: aboutUsPageModel,
    validation: {
      create: AboutValCreate,
      update: AboutValUpdate,
    },
  },
  "news-page": {
    model: newsPageModel,
    validation: {
      create: NewsPageValCreate,
      update: NewsPageValUpdate,
    },
  },
  interviews: {
    model: interviewsModel,
    validation: {
      create: interviewsValCreate,
      update: interviewsValUpdate,
    },
  },
  "contact-us": {
    model: contactUsPageModel,
    validation: {
      create: ContactPageValCreate,
      update: ContactPageValUpdate,
    },
  },
  services: {
    model: servicesPageModel,
    validation: {
      create: ServicesPageValCreate,
      update: ServicesPageValUpdate,
    },
  },
  client: {
    model: clientsPageModel,
    validation: {
      create: clientsPageValCreate,
      update: clientsPageValUpdate,
    },
  },
  footer: {
    model: footerComponentModel,
    validation: {
      create: footerValCreate,
      update: footerValUpdate,
    },
  },
};
