import ProductsPageValidationSchema from "./product.validation";
import productsSchema from "./product.schema.json";
export const productsPageConfig = {
  displayName: "products",
  key: "product",
  type: "pages",
  schema: productsSchema,
  validation: ProductsPageValidationSchema,
};
