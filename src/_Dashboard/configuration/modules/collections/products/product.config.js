import ProductValidationSchema from "./product.validation";
import productSchema from "./product.schema.json";
export const productConfig = {
  displayName: "products",
  key: "products",
  type: "collections",
  schema: productSchema,
  validation: ProductValidationSchema,
};
