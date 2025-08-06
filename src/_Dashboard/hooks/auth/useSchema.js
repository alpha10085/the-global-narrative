import schemas from "@/_Dashboard/configuration/schemas";
import { useAuth } from "@/contexts/AuthProvider";
import { useMemo } from "react";
import { getSchemaConfigByRole } from "./helpers";
import { notFound } from "next/navigation";

/**
 * @typedef {typeof schemas[0]} SchemaItem
 *
 * This type represents the structure of each schema item in the `schemas` array.
 * It is expected to include all fields defined within the schema, such as title, fields, etc.
 */

/**
 * Custom hook to retrieve schema configuration based on a user's role and a specific key.
 *
 * @param {string} key - The unique key to identify the schema in the schemas array.
 * @returns {SchemaItem}
 *   The schema configuration and authentication session data?.
 *   Includes any fields from the SchemaItem type along with loading and session state.
 */
const useSchema = (key, throwNotFound = true, category = null) => {
  const { session } = useAuth();
  const role = session?.role || null;
  const schema = useMemo(() => {
    if (!role || !key) return {}; // Return an empty object if role or key is missing
    const schemaItem =
      schemas?.find((item) => {
        if (item?.key === key && (category ? category === item?.type : true))
          return true;

        return false;
      }) || {};
    const getSchemaItem = getSchemaConfigByRole(schemaItem, role);
    if (getSchemaItem) {
      return getSchemaItem;
    }
    return throwNotFound ? notFound() : {};
  }, [key, role]);
  return schema;
};

export default useSchema;
