// ! good to know
//   key must be unique
//   type must be [ collections ,  pages , components  , private ]

import { adminConfig } from "./modules/Admin/admin.config";

import { mediaConfig } from "./modules/media/media.config";

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

  // collections

  // components
]; // empty array for now, you can add your schemas here.

export default schemas;
