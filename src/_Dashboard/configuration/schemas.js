// ! good to know
//   key must be unique
//   type must be [ collections ,  pages , components  , private ]

import { adminConfig } from "./modules/Admin/admin.config";
import { categoryConfig } from "./modules/collections/category/category.config";
import { customerConfig } from "./modules/collections/customer/customer.config";
import { ordersConfig } from "./modules/collections/orders/orders.config";
import { productConfig } from "./modules/collections/products/product.config";
import { requestsFormConfig } from "./modules/collections/requests-form/requests-form.config";
import { footerConfig } from "./modules/components/footer/footer.config";
import { popupFormConfig } from "./modules/components/popupFrom/popupForm.config";
import { mediaConfig } from "./modules/media/media.config";
import { aboutUsConfig } from "./modules/Pages/aboutUs/aboutUs.config";
import { contactUsConfig } from "./modules/Pages/contactUs/contactUs.config";
import { customerPageConfig } from "./modules/Pages/customer/customer.config";
import { landingConfig } from "./modules/Pages/Landing/landing.config";
import { productsPageConfig } from "./modules/Pages/products/product.config";
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
  aboutUsConfig,
  contactUsConfig,
  productsPageConfig,
  customerPageConfig,
  // collections
  categoryConfig,
  customerConfig,
  productConfig,
  requestsFormConfig,
  ordersConfig,
  // components
  popupFormConfig,
  footerConfig,
]; // empty array for now, you can add your schemas here.

export default schemas;
