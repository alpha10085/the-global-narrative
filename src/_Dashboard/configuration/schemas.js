// ! good to know
//   key must be unique
//   type must be [ collections ,  pages , components  , private ]

import { adminConfig } from "./modules/Admin/admin.config";

import { mediaConfig } from "./modules/media/media.config";

//pages
import { aboutConfig } from "./modules/pages/About/about.config";
import { clientConfig } from "./modules/pages/Client/client.config";
import { contactConfig } from "./modules/pages/Contact/contact.config";
import { landingConfig } from "./modules/pages/Landing/landing.config";
import { newsPageConfig } from "./modules/pages/News/news.config";
import { servicesConfig } from "./modules/pages/Services/services.config";

//collections
import { clientsConfig } from "./modules/collections/clients/clients.config";
import { faqConfig } from "./modules/collections/faq/faq.config";
import { interviewsConfig } from "./modules/collections/interviews/interviews.config";
import { interviewsCategoryConfig } from "./modules/collections/interviewsCategory/interviewsCategory.config";
import { newsConfig } from "./modules/collections/news/news.config";
import { newsCategoryConfig } from "./modules/collections/newsCategory/newsCategory.config";
import { testimonialConfig } from "./modules/collections/testimonial/testimonial.config";
import { contactUsConfig } from "./modules/collections/contact-us/contact-us.config";
import { serviceConfig } from "./modules/collections/service/service.config";

// componenet 
import { footerConfig } from "./modules/components/footer/footer.config";
import { interviewsPageConfig } from "./modules/pages/interviews/interviews.config";


// import { userConfig } from "./modules/collections/user/user.config";
const schemas = [
  // admin config
  adminConfig,
  // user config
  // userConfig,
  // media config
  mediaConfig,
  // project config...
  // pages
  landingConfig,
  aboutConfig,
  servicesConfig,
  newsPageConfig,
  interviewsPageConfig,
  contactConfig,
  clientConfig,
  
  // collections
  clientsConfig,
  serviceConfig,
  newsConfig,
  newsCategoryConfig,
  testimonialConfig,
  interviewsConfig,
  faqConfig,
  contactUsConfig,
  interviewsCategoryConfig,

  // components
  footerConfig
]; // empty array for now, you can add your schemas here.

export default schemas;
